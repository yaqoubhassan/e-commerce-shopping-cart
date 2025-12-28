import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ShoppingBagIcon,
    CreditCardIcon,
    LockClosedIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    TruckIcon,
    ArrowLeftIcon,
    CubeIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';

export default function Checkout({ cartItems, total }) {
    const { post, processing, errors } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AuthenticatedLayout>
            <Head title="Checkout" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl font-bold text-white">Secure Checkout</h1>
                            <p className="mt-2 text-indigo-100">Complete your order in just one step</p>
                        </motion.div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="bg-white border-b">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-center space-x-8">
                            <div className="flex items-center text-gray-400">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                                    <CheckCircleIcon className="h-5 w-5" />
                                </div>
                                <span className="ml-2 text-sm font-medium text-green-600">Cart</span>
                            </div>
                            <div className="w-12 h-px bg-gray-300" />
                            <div className="flex items-center">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white">
                                    <span className="text-sm font-medium">2</span>
                                </div>
                                <span className="ml-2 text-sm font-medium text-indigo-600">Review & Pay</span>
                            </div>
                            <div className="w-12 h-px bg-gray-300" />
                            <div className="flex items-center text-gray-400">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                    <span className="text-sm font-medium">3</span>
                                </div>
                                <span className="ml-2 text-sm font-medium">Confirmation</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Order Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Back Link */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Link
                                    href={route('cart.index')}
                                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors group"
                                >
                                    <ArrowLeftIcon className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                                    Back to Cart
                                </Link>
                            </motion.div>

                            {/* Items List */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden"
                            >
                                <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <ShoppingBagIcon className="h-5 w-5 text-indigo-600" />
                                        <h3 className="text-lg font-semibold text-gray-900">Order Review</h3>
                                        <span className="text-sm text-gray-500">({itemCount} items)</span>
                                    </div>
                                </div>
                                <ul className="divide-y divide-gray-100">
                                    {cartItems.map((item, index) => (
                                        <motion.li
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.05 }}
                                            className="p-6"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                                    {item.product.image ? (
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <CubeIcon className="h-8 w-8 text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base font-semibold text-gray-900 line-clamp-1">
                                                        {item.product.name}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        ${parseFloat(item.product.price).toFixed(2)} x {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    ${parseFloat(item.subtotal).toFixed(2)}
                                                </p>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Trust Badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-sm p-6"
                            >
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <LockClosedIcon className="h-8 w-8 mx-auto text-green-600 mb-2" />
                                        <p className="text-sm font-medium text-gray-900">Secure Checkout</p>
                                        <p className="text-xs text-gray-500">256-bit SSL encryption</p>
                                    </div>
                                    <div className="text-center">
                                        <TruckIcon className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                                        <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                                        <p className="text-xs text-gray-500">On all orders</p>
                                    </div>
                                    <div className="text-center">
                                        <ShieldCheckIcon className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                                        <p className="text-sm font-medium text-gray-900">Money Back</p>
                                        <p className="text-xs text-gray-500">30-day guarantee</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-sm p-6 sticky top-6"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Summary</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Items ({itemCount})</span>
                                        <span className="font-medium text-gray-900">${parseFloat(total).toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium text-green-600">Free</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-medium text-gray-900">$0.00</span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-semibold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-indigo-600">${parseFloat(total).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Messages */}
                                {(errors.stock || errors.error || errors.cart) && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-700">
                                                {errors.stock || errors.error || errors.cart}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="mt-6">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex items-center justify-center py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Processing Order...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCardIcon className="h-5 w-5 mr-2" />
                                                Place Order
                                            </>
                                        )}
                                    </motion.button>
                                </form>

                                <p className="mt-4 text-xs text-center text-gray-500">
                                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                                </p>

                                <div className="mt-6 flex items-center justify-center space-x-4">
                                    <LockClosedIcon className="h-4 w-4 text-gray-400" />
                                    <span className="text-xs text-gray-500">Secured with SSL encryption</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
