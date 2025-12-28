import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBagIcon,
    ShoppingCartIcon,
    UserIcon,
    Bars3Icon,
    XMarkIcon,
    ClipboardDocumentListIcon,
    ArrowRightOnRectangleIcon,
    UserPlusIcon
} from '@heroicons/react/24/outline';

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
                                    <ShoppingBagIcon className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    ShopCart
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden sm:flex sm:ml-10 sm:space-x-1">
                                <Link
                                    href={route('products.index')}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                        route().current('products.*') || route().current('home')
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                                    }`}
                                >
                                    Products
                                </Link>
                            </div>
                        </div>

                        {/* Desktop User Menu */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            {auth?.user ? (
                                <>
                                    <Link
                                        href={route('cart.index')}
                                        className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                            route().current('cart.*')
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <ShoppingCartIcon className="h-5 w-5" />
                                        <span>Cart</span>
                                    </Link>
                                    <Link
                                        href={route('orders.index')}
                                        className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                            route().current('orders.*')
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <ClipboardDocumentListIcon className="h-5 w-5" />
                                        <span>Orders</span>
                                    </Link>
                                    <div className="h-6 w-px bg-gray-200" />
                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span>{auth.user.name}</span>
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex items-center space-x-1 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                        <span>Log Out</span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                                    >
                                        <UserIcon className="h-5 w-5" />
                                        <span>Log In</span>
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                                    >
                                        <UserPlusIcon className="h-5 w-5" />
                                        <span>Sign Up</span>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                {showingNavigationDropdown ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {showingNavigationDropdown && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="sm:hidden bg-white border-t overflow-hidden"
                        >
                            <div className="px-4 py-3 space-y-1">
                                <Link
                                    href={route('products.index')}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                                        route().current('products.*') || route().current('home')
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <ShoppingBagIcon className="h-5 w-5" />
                                    <span>Products</span>
                                </Link>
                                {auth?.user && (
                                    <>
                                        <Link
                                            href={route('cart.index')}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                                                route().current('cart.*')
                                                    ? 'bg-indigo-50 text-indigo-600'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <ShoppingCartIcon className="h-5 w-5" />
                                            <span>Cart</span>
                                        </Link>
                                        <Link
                                            href={route('orders.index')}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                                                route().current('orders.*')
                                                    ? 'bg-indigo-50 text-indigo-600'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <ClipboardDocumentListIcon className="h-5 w-5" />
                                            <span>Orders</span>
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="border-t border-gray-200 px-4 py-4">
                                {auth?.user ? (
                                    <>
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-base font-medium text-gray-800">{auth.user.name}</div>
                                                <div className="text-sm text-gray-500">{auth.user.email}</div>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                <UserIcon className="h-5 w-5" />
                                                <span>Profile</span>
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50"
                                            >
                                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                                <span>Log Out</span>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            href={route('login')}
                                            className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl text-base font-medium text-gray-700 border border-gray-200 hover:bg-gray-50"
                                        >
                                            <UserIcon className="h-5 w-5" />
                                            <span>Log In</span>
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600"
                                        >
                                            <UserPlusIcon className="h-5 w-5" />
                                            <span>Sign Up</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-white border-t mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
                                <ShoppingBagIcon className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-gray-800">ShopCart</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} ShopCart. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
