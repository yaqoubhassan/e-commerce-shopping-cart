import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeftIcon,
    CheckCircleIcon,
    ClockIcon,
    TruckIcon,
    CubeIcon,
    CalendarIcon,
    ReceiptRefundIcon,
    ShoppingBagIcon,
    PrinterIcon
} from '@heroicons/react/24/outline';

export default function Show({ order }) {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    icon: CheckCircleIcon,
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    iconColor: 'text-green-600',
                    label: 'Completed',
                    description: 'Your order has been delivered successfully'
                };
            case 'pending':
                return {
                    icon: ClockIcon,
                    bg: 'bg-yellow-100',
                    text: 'text-yellow-700',
                    iconColor: 'text-yellow-600',
                    label: 'Pending',
                    description: 'Your order is being processed'
                };
            case 'processing':
                return {
                    icon: TruckIcon,
                    bg: 'bg-blue-100',
                    text: 'text-blue-700',
                    iconColor: 'text-blue-600',
                    label: 'Processing',
                    description: 'Your order is on its way'
                };
            default:
                return {
                    icon: CubeIcon,
                    bg: 'bg-gray-100',
                    text: 'text-gray-700',
                    iconColor: 'text-gray-600',
                    label: status.charAt(0).toUpperCase() + status.slice(1),
                    description: 'Order status'
                };
        }
    };

    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;

    return (
        <AuthenticatedLayout>
            <Head title={`Order #${order.id}`} />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Link
                                href={route('orders.index')}
                                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors group"
                            >
                                <ArrowLeftIcon className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                                Back to Orders
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    {/* Order Header Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8"
                    >
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-4 rounded-2xl ${statusConfig.bg}`}>
                                        <StatusIcon className={`h-8 w-8 ${statusConfig.iconColor}`} />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-3">
                                            <h1 className="text-2xl font-bold text-gray-900">
                                                Order #{order.id}
                                            </h1>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-gray-500">{statusConfig.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        <PrinterIcon className="h-4 w-4 mr-2" />
                                        Print
                                    </motion.button>
                                    <Link
                                        href={route('products.index')}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                                    >
                                        <ShoppingBagIcon className="h-4 w-4 mr-2" />
                                        Shop Again
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Order Items */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden"
                            >
                                <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <CubeIcon className="h-5 w-5 text-indigo-600" />
                                        <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                                        <span className="text-sm text-gray-500">({order.items.length} items)</span>
                                    </div>
                                </div>
                                <ul className="divide-y divide-gray-100">
                                    {order.items.map((item, index) => (
                                        <motion.li
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.05 }}
                                            className="p-6"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <Link
                                                    href={route('products.show', item.product_id)}
                                                    className="flex-shrink-0"
                                                >
                                                    <div className="h-20 w-20 overflow-hidden rounded-xl bg-gray-100 hover:opacity-80 transition-opacity">
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
                                                </Link>
                                                <div className="flex-1 min-w-0">
                                                    <Link
                                                        href={route('products.show', item.product_id)}
                                                        className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1"
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        ${parseFloat(item.price).toFixed(2)} x {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-sm p-6"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-sm">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100">
                                            <ReceiptRefundIcon className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Order Number</p>
                                            <p className="font-semibold text-gray-900">#{order.id}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 text-sm">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100">
                                            <CalendarIcon className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Order Date</p>
                                            <p className="font-semibold text-gray-900">
                                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 text-sm">
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${statusConfig.bg}`}>
                                            <StatusIcon className={`h-4 w-4 ${statusConfig.iconColor}`} />
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Status</p>
                                            <p className={`font-semibold ${statusConfig.text}`}>
                                                {statusConfig.label}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 mt-6 pt-6">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium text-gray-900">
                                            ${parseFloat(order.total_amount).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium text-green-600">Free</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-medium text-gray-900">$0.00</span>
                                    </div>

                                    <div className="border-t border-gray-200 mt-4 pt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-semibold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-indigo-600">
                                                ${parseFloat(order.total_amount).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Need Help Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
                            >
                                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Have questions about your order? Our support team is here to help.
                                </p>
                                <button className="w-full py-2 px-4 bg-white text-indigo-600 text-sm font-medium rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-colors">
                                    Contact Support
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
