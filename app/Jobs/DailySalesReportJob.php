<?php

namespace App\Jobs;

use App\Mail\DailySalesReport;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class DailySalesReportJob implements ShouldQueue
{
    use Queueable;

    public function __construct() {}

    public function handle(): void
    {
        $today = Carbon::today();

        $orders = Order::with('items.product')
            ->whereDate('created_at', $today)
            ->where('status', 'completed')
            ->get();

        $totalSales = $orders->sum('total_amount');
        $totalOrders = $orders->count();

        $productsSold = [];
        foreach ($orders as $order) {
            foreach ($order->items as $item) {
                $productId = $item->product_id;
                if (!isset($productsSold[$productId])) {
                    $productsSold[$productId] = [
                        'name' => $item->product->name,
                        'quantity' => 0,
                        'revenue' => 0,
                    ];
                }
                $productsSold[$productId]['quantity'] += $item->quantity;
                $productsSold[$productId]['revenue'] += $item->price * $item->quantity;
            }
        }

        $admins = User::where('is_admin', true)->get();

        foreach ($admins as $admin) {
            Mail::to($admin->email)->send(new DailySalesReport(
                date: $today,
                totalSales: $totalSales,
                totalOrders: $totalOrders,
                productsSold: $productsSold
            ));
        }
    }
}
