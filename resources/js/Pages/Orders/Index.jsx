import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ClipboardDocumentListIcon,
    ShoppingBagIcon,
    EyeIcon,
    CheckCircleIcon,
    ClockIcon,
    TruckIcon,
    CubeIcon
} from '@heroicons/react/24/outline';

export default function Index({ orders }) {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    icon: CheckCircleIcon,
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    iconColor: 'text-green-600',
                    label: 'Completed'
                };
            case 'pending':
                return {
                    icon: ClockIcon,
                    bg: 'bg-yellow-100',
                    text: 'text-yellow-700',
                    iconColor: 'text-yellow-600',
                    label: 'Pending'
                };
            case 'processing':
                return {
                    icon: TruckIcon,
                    bg: 'bg-blue-100',
                    text: 'text-blue-700',
                    iconColor: 'text-blue-600',
                    label: 'Processing'
                };
            default:
                return {
                    icon: CubeIcon,
                    bg: 'bg-gray-100',
                    text: 'text-gray-700',
                    iconColor: 'text-gray-600',
                    label: status.charAt(0).toUpperCase() + status.slice(1)
                };
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Orders" />

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
                                    <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                                    <p className="text-gray-500">Track and manage your orders</p>
                                </div>
                            </div>
                            <Link
                                href={route('products.index')}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                            >
                                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                                Continue Shopping
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    {orders.data.length > 0 ? (
                        <>
                            {/* Orders Grid */}
                            <div className="space-y-4">
                                {orders.data.map((order, index) => {
                                    const statusConfig = getStatusConfig(order.status);
                                    const StatusIcon = statusConfig.icon;

                                    return (
                                        <motion.div
                                            key={order.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                        >
                                            <div className="p-6">
                                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                                    {/* Order Info */}
                                                    <div className="flex items-start space-x-4">
                                                        <div className={`p-3 rounded-xl ${statusConfig.bg}`}>
                                                            <StatusIcon className={`h-6 w-6 ${statusConfig.iconColor}`} />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center space-x-3">
                                                                <h3 className="text-lg font-semibold text-gray-900">
                                                                    Order #{order.id}
                                                                </h3>
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                                                    {statusConfig.label}
                                                                </span>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Order Stats */}
                                                    <div className="flex items-center space-x-8">
                                                        <div className="text-center">
                                                            <p className="text-sm text-gray-500">Items</p>
                                                            <p className="text-lg font-semibold text-gray-900">{order.items.length}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-sm text-gray-500">Total</p>
                                                            <p className="text-lg font-bold text-indigo-600">
                                                                ${parseFloat(order.total_amount).toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <motion.div
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Link
                                                                href={route('orders.show', order.id)}
                                                                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
                                                            >
                                                                <EyeIcon className="h-4 w-4 mr-2" />
                                                                View Details
                                                            </Link>
                                                        </motion.div>
                                                    </div>
                                                </div>

                                                {/* Preview of Items */}
                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex -space-x-3">
                                                            {order.items.slice(0, 4).map((item, i) => (
                                                                <div
                                                                    key={item.id}
                                                                    className="h-12 w-12 rounded-lg bg-gray-100 border-2 border-white overflow-hidden"
                                                                    style={{ zIndex: 4 - i }}
                                                                >
                                                                    {item.product.image ? (
                                                                        <img
                                                                            src={item.product.image}
                                                                            alt={item.product.name}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="h-full w-full flex items-center justify-center">
                                                                            <CubeIcon className="h-6 w-6 text-gray-300" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            {order.items.length > 4 && (
                                                                <div className="h-12 w-12 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center">
                                                                    <span className="text-xs font-medium text-gray-600">
                                                                        +{order.items.length - 4}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {order.items.slice(0, 2).map(item => item.product.name).join(', ')}
                                                            {order.items.length > 2 && ` and ${order.items.length - 2} more`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {orders.last_page > 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8 flex justify-center"
                                >
                                    <nav className="flex items-center space-x-2">
                                        {orders.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                                                    link.active
                                                        ? 'bg-indigo-600 text-white shadow-md'
                                                        : link.url
                                                        ? 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-12 text-center shadow-sm"
                        >
                            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-indigo-100 mb-6">
                                <ClipboardDocumentListIcon className="h-12 w-12 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">No orders yet</h3>
                            <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                                You haven't placed any orders yet. Start exploring our amazing products!
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
