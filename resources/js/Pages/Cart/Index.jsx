import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCartIcon,
    TrashIcon,
    MinusIcon,
    PlusIcon,
    ArrowRightIcon,
    ShoppingBagIcon,
    TruckIcon,
    ShieldCheckIcon,
    TagIcon,
    CubeIcon
} from '@heroicons/react/24/outline';

export default function Index({ cartItems, total }) {
    const updateQuantity = (cartItemId, quantity) => {
        router.patch(route('cart.update', cartItemId), {
            quantity: quantity,
        }, {
            preserveScroll: true,
        });
    };

    const removeItem = (cartItemId) => {
        router.delete(route('cart.remove', cartItemId), {
            preserveScroll: true,
        });
    };

    const incrementQuantity = (item) => {
        if (item.quantity < Math.min(10, item.product.stock_quantity)) {
            updateQuantity(item.id, item.quantity + 1);
        }
    };

    const decrementQuantity = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        }
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AuthenticatedLayout>
            <Head title="Shopping Cart" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-indigo-100 rounded-2xl">
                                    <ShoppingCartIcon className="h-8 w-8 text-indigo-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                                    <p className="text-gray-500">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
                                </div>
                            </div>
                            <Link
                                href={route('products.index')}
                                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                                Continue Shopping
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                <AnimatePresence>
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                        >
                                            <div className="p-6">
                                                <div className="flex items-start space-x-6">
                                                    {/* Product Image */}
                                                    <Link href={route('products.show', item.product_id)} className="flex-shrink-0">
                                                        <div className="h-28 w-28 overflow-hidden rounded-xl bg-gray-100">
                                                            {item.product.image ? (
                                                                <img
                                                                    src={item.product.image}
                                                                    alt={item.product.name}
                                                                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full items-center justify-center">
                                                                    <CubeIcon className="h-10 w-10 text-gray-300" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>

                                                    {/* Product Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <Link
                                                                    href={route('products.show', item.product_id)}
                                                                    className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1"
                                                                >
                                                                    {item.product.name}
                                                                </Link>
                                                                <p className="mt-1 text-sm text-gray-500">
                                                                    Unit Price: <span className="font-medium text-gray-700">${parseFloat(item.product.price).toFixed(2)}</span>
                                                                </p>
                                                                {item.product.stock_quantity <= 5 && (
                                                                    <span className="inline-flex items-center mt-2 px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded-full">
                                                                        Only {item.product.stock_quantity} left
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-xl font-bold text-gray-900">
                                                                ${parseFloat(item.subtotal).toFixed(2)}
                                                            </p>
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div className="mt-4 flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-sm text-gray-500">Qty:</span>
                                                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                                                    <motion.button
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={() => decrementQuantity(item)}
                                                                        disabled={item.quantity <= 1}
                                                                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                                    >
                                                                        <MinusIcon className="h-4 w-4 text-gray-600" />
                                                                    </motion.button>
                                                                    <span className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-50 min-w-[50px] text-center">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <motion.button
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={() => incrementQuantity(item)}
                                                                        disabled={item.quantity >= Math.min(10, item.product.stock_quantity)}
                                                                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                                    >
                                                                        <PlusIcon className="h-4 w-4 text-gray-600" />
                                                                    </motion.button>
                                                                </div>
                                                            </div>

                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => removeItem(item.id)}
                                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                <TrashIcon className="h-4 w-4 mr-1" />
                                                                Remove
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white rounded-2xl shadow-sm p-6 sticky top-6"
                                >
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                                            <span className="font-medium text-gray-900">${parseFloat(total).toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-medium text-green-600">Free</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Taxes</span>
                                            <span className="font-medium text-gray-500">Calculated at checkout</span>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4 mt-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-semibold text-gray-900">Total</span>
                                                <span className="text-2xl font-bold text-indigo-600">${parseFloat(total).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-6"
                                    >
                                        <Link
                                            href={route('orders.checkout')}
                                            className="flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                                        >
                                            Checkout
                                            <ArrowRightIcon className="h-5 w-5 ml-2" />
                                        </Link>
                                    </motion.div>

                                    {/* Trust Badges */}
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <TruckIcon className="h-5 w-5 text-indigo-600" />
                                                <span>Free Shipping</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <ShieldCheckIcon className="h-5 w-5 text-indigo-600" />
                                                <span>Secure Payment</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <TagIcon className="h-5 w-5 text-indigo-600" />
                                                <span>Best Price</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <ShoppingBagIcon className="h-5 w-5 text-indigo-600" />
                                                <span>Easy Returns</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-12 text-center shadow-sm"
                        >
                            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-indigo-100 mb-6">
                                <ShoppingCartIcon className="h-12 w-12 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Your cart is empty</h3>
                            <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                                Looks like you haven't added anything to your cart yet. Start exploring our products!
                            </p>
                            <div className="mt-8">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={route('products.index')}
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                                    >
                                        <ShoppingBagIcon className="h-5 w-5 mr-2" />
                                        Start Shopping
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
