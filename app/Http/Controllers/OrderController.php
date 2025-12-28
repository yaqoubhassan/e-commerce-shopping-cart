<?php

namespace App\Http\Controllers;

use App\Jobs\LowStockNotificationJob;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Auth::user()->orders()
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load('items.product');

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function checkout()
    {
        $cart = Auth::user()->cart;

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')
                ->withErrors(['cart' => 'Your cart is empty.']);
        }

        $cart->load('items.product');

        return Inertia::render('Orders/Checkout', [
            'cart' => $cart,
            'cartItems' => $cart->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'product' => $item->product,
                    'subtotal' => $item->subtotal,
                ];
            }),
            'total' => $cart->total,
        ]);
    }

    public function store(Request $request)
    {
        $cart = Auth::user()->cart;

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')
                ->withErrors(['cart' => 'Your cart is empty.']);
        }

        $cart->load('items.product');

        // Validate stock availability
        foreach ($cart->items as $item) {
            if ($item->quantity > $item->product->stock_quantity) {
                return back()->withErrors([
                    'stock' => "Not enough stock for {$item->product->name}. Available: {$item->product->stock_quantity}"
                ]);
            }
        }

        DB::beginTransaction();

        try {
            // Create order
            $order = Order::create([
                'user_id' => Auth::id(),
                'total_amount' => $cart->total,
                'status' => 'completed',
            ]);

            // Create order items and update stock
            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                // Decrement stock
                $product = $item->product;
                $product->decrement('stock_quantity', $item->quantity);

                // Check for low stock and dispatch notification job
                if ($product->fresh()->isLowStock()) {
                    LowStockNotificationJob::dispatch($product->fresh());
                }
            }

            // Clear cart
            $cart->items()->delete();

            DB::commit();

            return redirect()->route('orders.show', $order)
                ->with('success', 'Order placed successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to place order. Please try again.']);
        }
    }
}
