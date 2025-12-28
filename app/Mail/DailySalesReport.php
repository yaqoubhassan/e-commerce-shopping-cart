<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DailySalesReport extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Carbon $date,
        public float $totalSales,
        public int $totalOrders,
        public array $productsSold
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Daily Sales Report - ' . $this->date->format('M d, Y'),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.daily-sales-report',
            with: [
                'date' => $this->date,
                'totalSales' => $this->totalSales,
                'totalOrders' => $this->totalOrders,
                'productsSold' => $this->productsSold,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
