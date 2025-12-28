import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, SparklesIcon, CubeIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Index({ products }) {
    const { auth } = usePage().props;
    const [processing, setProcessing] = useState(false);

    const addToCart = (productId) => {
        setProcessing(true);
        router.post(route('cart.add'), {
            product_id: productId,
            quantity: 1,
        }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <MainLayout>
            <Head title="Products" />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-amber-500/10 backdrop-blur-sm border border-amber-500/20"
                        >
                            <SparklesIcon className="h-5 w-5 text-amber-400 mr-2" />
                            <span className="text-amber-300 text-sm font-medium">New arrivals every week</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Discover Our Products
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Explore our curated collection of premium products designed to elevate your lifestyle
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white rounded-2xl shadow-sm"
                    >
                        <div className="flex items-center space-x-2">
                            <CubeIcon className="h-5 w-5 text-indigo-600" />
                            <span className="text-gray-700 font-medium">
                                {products.total || products.data.length} Products
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                Showing {products.from || 1} - {products.to || products.data.length}
                            </span>
                        </div>
                    </motion.div>

                    {/* Product Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {products.data.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    <Link href={route('products.show', product.id)}>
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-56 w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="flex h-56 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                                <CubeIcon className="h-16 w-16 text-gray-300" />
                                            </div>
                                        )}
                                    </Link>

                                    {/* Stock Badge */}
                                    <div className="absolute top-3 left-3">
                                        {product.stock_quantity <= 5 ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Only {product.stock_quantity} left
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                In Stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Quick Add Button - Shows on hover */}
                                    {auth?.user && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileHover={{ opacity: 1, y: 0 }}
                                            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            <button
                                                onClick={() => addToCart(product.id)}
                                                disabled={processing || product.stock_quantity === 0}
                                                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                            >
                                                <ShoppingCartIcon className="h-4 w-4" />
                                                <span>{processing ? 'Adding...' : 'Quick Add'}</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <Link href={route('products.show', product.id)}>
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Rating (placeholder) */}
                                    <div className="mt-3 flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`}
                                            />
                                        ))}
                                        <span className="ml-2 text-xs text-gray-500">(4.0)</span>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-gray-900">
                                                ${parseFloat(product.price).toFixed(2)}
                                            </span>
                                        </div>

                                        {!auth?.user && (
                                            <Link
                                                href={route('login')}
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors duration-200"
                                            >
                                                Sign in to buy
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Empty State */}
                    {products.data.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-2xl bg-white p-12 text-center shadow-lg"
                        >
                            <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-indigo-100 mb-6">
                                <CubeIcon className="h-10 w-10 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">No products available</h3>
                            <p className="mt-2 text-gray-500">Check back later for new arrivals!</p>
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 flex justify-center"
                        >
                            <nav className="flex items-center space-x-2">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
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
                </div>
            </div>
        </MainLayout>
    );
}
