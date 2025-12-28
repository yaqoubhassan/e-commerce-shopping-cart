<?php

use App\Jobs\DailySalesReportJob;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withSchedule(function (Schedule $schedule): void {
        // Send daily sales report every evening at 6 PM
        // For production: ->dailyAt('18:00')
        // For testing: ->everyMinute() or ->everyFiveMinutes()
        $schedule->job(new DailySalesReportJob())->dailyAt('18:00');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
