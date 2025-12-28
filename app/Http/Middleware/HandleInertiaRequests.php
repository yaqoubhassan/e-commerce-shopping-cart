<?php

namespace App\Http\Middleware;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cartCount' => fn() => $this->getCartCount($request),
        ];
    }

    /**
     * Get the cart item count for the authenticated user.
     */
    private function getCartCount(Request $request): int
    {
        if (!$request->user()) {
            return 0;
        }

        return CartItem::whereHas('cart', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->sum('quantity');
    }
}
