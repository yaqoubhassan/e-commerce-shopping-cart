<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Wireless Bluetooth Headphones',
                'description' => 'High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals. Features 40-hour battery life, premium comfort padding, and crystal-clear audio.',
                'price' => 79.99,
                'stock_quantity' => 50,
                'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Smart Watch Pro',
                'description' => 'Feature-packed smartwatch with health tracking, GPS, and water resistance. Stay connected on the go with notifications, fitness tracking, and a stunning AMOLED display.',
                'price' => 199.99,
                'stock_quantity' => 30,
                'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Portable Power Bank',
                'description' => '20000mAh high-capacity power bank with fast charging support. Never run out of battery again. Dual USB ports, LED indicator, and compact design for easy portability.',
                'price' => 39.99,
                'stock_quantity' => 100,
                'image' => 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'USB-C Hub Adapter',
                'description' => '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and PD charging. Essential for modern laptops. Aluminum construction for durability and heat dissipation.',
                'price' => 49.99,
                'stock_quantity' => 75,
                'image' => 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Mechanical Keyboard',
                'description' => 'RGB mechanical gaming keyboard with cherry MX switches. Durable and responsive for gaming and typing. Customizable backlighting with 16.8 million colors.',
                'price' => 129.99,
                'stock_quantity' => 40,
                'image' => 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Wireless Mouse',
                'description' => 'Ergonomic wireless mouse with adjustable DPI settings. Comfortable for extended use with silent clicks and long battery life. Perfect for work and gaming.',
                'price' => 29.99,
                'stock_quantity' => 120,
                'image' => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Laptop Stand',
                'description' => 'Adjustable aluminum laptop stand for better ergonomics. Compatible with all laptop sizes up to 17 inches. Improves airflow and reduces neck strain.',
                'price' => 45.99,
                'stock_quantity' => 60,
                'image' => 'https://images.unsplash.com/photo-1527434110053-a03e3ed5232e?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Webcam HD 1080p',
                'description' => 'Full HD webcam with built-in microphone and auto-focus. Perfect for video calls and streaming. Wide-angle lens and automatic low-light correction.',
                'price' => 59.99,
                'stock_quantity' => 45,
                'image' => 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Bluetooth Speaker',
                'description' => 'Portable waterproof Bluetooth speaker with 360-degree sound. Great for outdoor adventures. 24-hour playtime and built-in power bank functionality.',
                'price' => 69.99,
                'stock_quantity' => 55,
                'image' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Gaming Mousepad XL',
                'description' => 'Extra-large gaming mousepad with stitched edges and non-slip base. Smooth surface for precision. RGB lighting around the edges for an immersive experience.',
                'price' => 24.99,
                'stock_quantity' => 80,
                'image' => 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Phone Case - Premium',
                'description' => 'Shock-absorbing premium phone case with sleek design. Protection meets style. Military-grade drop protection with slim profile.',
                'price' => 19.99,
                'stock_quantity' => 3,
                'image' => 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
            ],
            [
                'name' => 'Screen Protector Pack',
                'description' => 'Tempered glass screen protector 3-pack. Scratch-resistant and easy to apply. 9H hardness with oleophobic coating to resist fingerprints.',
                'price' => 14.99,
                'stock_quantity' => 5,
                'image' => 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
