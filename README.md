# Simple E-commerce Shopping Cart

A simple e-commerce shopping cart application built with Laravel, Inertia.js, and React. Users can browse products, add them to a cart, update quantities, remove items, and place orders.

## Tech Stack

-   **Backend:** Laravel 12
-   **Frontend:** Inertia.js + React
-   **Styling:** Tailwind CSS
-   **Database:** PostgreSQL (configurable)
-   **Queue:** Database driver

## Features

-   User authentication (register, login, logout)
-   Product listing with pagination
-   Product detail pages
-   Shopping cart management (add, update, remove items)
-   Cart persisted in database per authenticated user
-   Checkout and order placement
-   Order history
-   Low stock email notifications (via queued jobs)
-   Daily sales report (via scheduled jobs)

## Requirements

-   PHP >= 8.2
-   Composer
-   Node.js >= 18
-   PostgreSQL (or MySQL/SQLite)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd simple-shopping-cart
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install Node.js dependencies

```bash
npm install
```

### 4. Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configure your database

Edit `.env` file with your database credentials:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=shopping_cart
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 6. Run migrations and seed the database

```bash
php artisan migrate
php artisan db:seed
```

### 7. Build frontend assets

```bash
# For development
npm run dev

# For production
npm run build
```

### 8. Start the development server

```bash
php artisan serve
```

Visit `http://localhost:8000` in your browser.

## Default Users

After seeding, you'll have:

| User       | Email             | Password | Role  |
| ---------- | ----------------- | -------- | ----- |
| Admin User | admin@example.com | password | Admin |

## Jobs and Queues

This application uses Laravel's queue system for background processing.

### Low Stock Notification Job

**File:** `app/Jobs/LowStockNotificationJob.php`

This job is dispatched automatically when a product's stock falls to 5 or below after a purchase. It sends an email notification to all admin users.

**How it works:**

1. When an order is placed, stock is decremented
2. After decrement, the system checks if stock <= 5
3. If low stock, `LowStockNotificationJob::dispatch($product)` is called
4. The job is added to the queue and processed by a worker
5. Email is sent to all users with `is_admin = true`

### Running the Queue Worker

To process queued jobs, run:

```bash
# Run the queue worker
php artisan queue:work

# Run with specific options
php artisan queue:work --tries=3 --timeout=90

# Run in the background (production)
php artisan queue:work --daemon
```

For production, use a process manager like Supervisor to keep the worker running.

**Supervisor configuration example** (`/etc/supervisor/conf.d/laravel-worker.conf`):

```ini
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/your/project/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
numprocs=1
redirect_stderr=true
stdout_logfile=/path/to/your/project/storage/logs/worker.log
```

## Scheduled Jobs (Cron)

### Daily Sales Report

**File:** `app/Jobs/DailySalesReportJob.php`

This job runs every day at 6:00 PM and sends a summary of the day's sales to all admin users.

**Schedule configuration** (`bootstrap/app.php`):

```php
->withSchedule(function (Schedule $schedule): void {
    $schedule->job(new DailySalesReportJob())->dailyAt('18:00');
})
```

### Running the Scheduler

Laravel's scheduler needs to be triggered by a system cron job. Add this entry to your server's crontab:

```bash
# Open crontab
crontab -e

# Add this line
* * * * * cd /path/to/your/project && php artisan schedule:run >> /dev/null 2>&1
```

This runs every minute and Laravel determines which scheduled tasks are due.

### Testing the Scheduler Locally

```bash
# List all scheduled tasks
php artisan schedule:list

# Run the scheduler manually
php artisan schedule:run

# Run a specific scheduled task
php artisan schedule:test
```

## Project Structure

```
app/
├── Http/Controllers/
│   ├── CartController.php      # Cart management
│   ├── OrderController.php     # Orders and checkout
│   └── ProductController.php   # Product listing
├── Jobs/
│   ├── DailySalesReportJob.php # Daily sales report
│   └── LowStockNotificationJob.php # Low stock alerts
├── Mail/
│   ├── DailySalesReport.php    # Sales report mailable
│   └── LowStockNotification.php # Low stock mailable
└── Models/
    ├── Cart.php
    ├── CartItem.php
    ├── Order.php
    ├── OrderItem.php
    ├── Product.php
    └── User.php

resources/js/
├── Layouts/
│   ├── AuthenticatedLayout.jsx
│   └── MainLayout.jsx
└── Pages/
    ├── Cart/Index.jsx
    ├── Orders/
    │   ├── Checkout.jsx
    │   ├── Index.jsx
    │   └── Show.jsx
    └── Products/
        ├── Index.jsx
        └── Show.jsx
```

## API Routes

| Method | URI            | Description               |
| ------ | -------------- | ------------------------- |
| GET    | /              | Product listing (home)    |
| GET    | /products      | Product listing           |
| GET    | /products/{id} | Product details           |
| GET    | /cart          | View cart                 |
| POST   | /cart/add      | Add item to cart          |
| PATCH  | /cart/{id}     | Update cart item quantity |
| DELETE | /cart/{id}     | Remove item from cart     |
| GET    | /checkout      | Checkout page             |
| POST   | /orders        | Place order               |
| GET    | /orders        | Order history             |
| GET    | /orders/{id}   | Order details             |

## Email Configuration

For development, emails are logged to `storage/logs/laravel.log`. For production, configure your mail driver in `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="shop@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```
