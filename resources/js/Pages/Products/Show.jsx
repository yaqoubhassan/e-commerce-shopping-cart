import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeftIcon,
    ShoppingCartIcon,
    TruckIcon,
    ShieldCheckIcon,
    ArrowPathIcon,
    MinusIcon,
    PlusIcon,
    CubeIcon,
    CheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Show({ product }) {
    const { auth } = usePage().props;
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const addToCart = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post(route('cart.add'), {
            product_id: product.id,
            quantity: quantity,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 2000);
            },
            onError: (errs) => setErrors(errs),
            onFinish: () => setProcessing(false),
        });
    };

    const incrementQuantity = () => {
        if (quantity < Math.min(10, product.stock_quantity)) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const features = [
        { icon: TruckIcon, title: 'Free Shipping', description: 'On orders over $50' },
        { icon: ShieldCheckIcon, title: 'Secure Payment', description: '100% protected' },
        { icon: ArrowPathIcon, title: 'Easy Returns', description: '30-day return policy' },
    ];

    return (
        <MainLayout>
            <Head title={product.name} />

            <div className="bg-gray-50 min-h-screen">
                {/* Breadcrumb */}
                <div className="bg-white border-b">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link
                                href={route('products.index')}
                                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors group"
                            >
                                <ArrowLeftIcon className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                                Back to Products
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Product Image */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-8 lg:p-12"
                            >
                                {/* Stock Badge */}
                                <div className="absolute top-6 left-6 z-10">
                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                                        product.stock_quantity > 10
                                            ? 'bg-green-100 text-green-800'
                                            : product.stock_quantity > 0
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.stock_quantity > 0
                                            ? product.stock_quantity > 10
                                                ? 'In Stock'
                                                : `Only ${product.stock_quantity} left`
                                            : 'Out of stock'}
                                    </span>
                                </div>

                                {product.image ? (
                                    <motion.img
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-lg"
                                    />
                                ) : (
                                    <div className="flex h-[400px] lg:h-[500px] items-center justify-center rounded-2xl bg-gray-200">
                                        <CubeIcon className="h-32 w-32 text-gray-300" />
                                    </div>
                                )}
                            </motion.div>

                            {/* Product Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="p-8 lg:p-12 flex flex-col justify-center"
                            >
                                <div className="space-y-6">
                                    {/* Category Badge */}
                                    <motion.span
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full"
                                    >
                                        Premium Product
                                    </motion.span>

                                    {/* Title */}
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                        className="text-3xl lg:text-4xl font-bold text-gray-900"
                                    >
                                        {product.name}
                                    </motion.h1>

                                    {/* Rating */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-center space-x-2"
                                    >
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">(4.0) · 128 reviews</span>
                                    </motion.div>

                                    {/* Price */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.45 }}
                                        className="flex items-baseline space-x-3"
                                    >
                                        <span className="text-4xl font-bold text-gray-900">
                                            ${parseFloat(product.price).toFixed(2)}
                                        </span>
                                        <span className="text-lg text-gray-400 line-through">
                                            ${(parseFloat(product.price) * 1.2).toFixed(2)}
                                        </span>
                                        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                                            Save 20%
                                        </span>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-gray-600 leading-relaxed"
                                    >
                                        {product.description}
                                    </motion.p>

                                    {/* Quantity & Add to Cart */}
                                    {auth?.user ? (
                                        product.stock_quantity > 0 && (
                                            <motion.form
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.55 }}
                                                onSubmit={addToCart}
                                                className="space-y-4"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                                        <button
                                                            type="button"
                                                            onClick={decrementQuantity}
                                                            className="p-3 hover:bg-gray-100 transition-colors"
                                                        >
                                                            <MinusIcon className="h-4 w-4 text-gray-600" />
                                                        </button>
                                                        <span className="px-6 py-2 text-lg font-semibold text-gray-900 bg-gray-50">
                                                            {quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={incrementQuantity}
                                                            className="p-3 hover:bg-gray-100 transition-colors"
                                                        >
                                                            <PlusIcon className="h-4 w-4 text-gray-600" />
                                                        </button>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {product.stock_quantity} available
                                                    </span>
                                                </div>

                                                {errors.quantity && (
                                                    <p className="text-sm text-red-600">{errors.quantity}</p>
                                                )}

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="submit"
                                                    disabled={processing}
                                                    className={`w-full flex items-center justify-center space-x-2 py-4 px-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                                                        addedToCart
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                                                >
                                                    {processing ? (
                                                        <>
                                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                            </svg>
                                                            <span>Adding to Cart...</span>
                                                        </>
                                                    ) : addedToCart ? (
                                                        <>
                                                            <CheckIcon className="h-6 w-6" />
                                                            <span>Added to Cart!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShoppingCartIcon className="h-6 w-6" />
                                                            <span>Add to Cart</span>
                                                        </>
                                                    )}
                                                </motion.button>
                                            </motion.form>
                                        )
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.55 }}
                                        >
                                            <Link
                                                href={route('login')}
                                                className="flex items-center justify-center space-x-2 w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl shadow-lg hover:from-gray-800 hover:to-gray-900 transition-all"
                                            >
                                                <ShoppingCartIcon className="h-6 w-6" />
                                                <span>Sign in to Purchase</span>
                                            </Link>
                                        </motion.div>
                                    )}

                                    {/* Features */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100"
                                    >
                                        {features.map((feature, index) => (
                                            <div key={index} className="text-center">
                                                <feature.icon className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                                                <p className="text-sm font-medium text-gray-900">{feature.title}</p>
                                                <p className="text-xs text-gray-500">{feature.description}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
