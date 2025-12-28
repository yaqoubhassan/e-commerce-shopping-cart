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
    ChevronDownIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

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
                                    className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                        route().current('products.*') || route().current('home')
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <ShoppingBagIcon className="h-5 w-5" />
                                    <span>Products</span>
                                </Link>
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
                                        route().current('orders.*') && !route().current('orders.checkout')
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <ClipboardDocumentListIcon className="h-5 w-5" />
                                    <span>Orders</span>
                                </Link>
                            </div>
                        </div>

                        {/* Desktop User Menu */}
                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span>{user.name}</span>
                                    <ChevronDownIcon className={`h-4 w-4 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showUserDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
                                        >
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
                                                <span>Profile Settings</span>
                                            </Link>
                                            <div className="border-t border-gray-100 my-1" />
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="flex items-center space-x-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                                <span>Log Out</span>
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
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
                                        route().current('orders.*') && !route().current('orders.checkout')
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <ClipboardDocumentListIcon className="h-5 w-5" />
                                    <span>Orders</span>
                                </Link>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-4">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-base font-medium text-gray-800">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <Cog6ToothIcon className="h-5 w-5" />
                                        <span>Profile Settings</span>
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
