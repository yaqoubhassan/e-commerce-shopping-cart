<x-mail::message>
# Daily Sales Report

**Date:** {{ $date->format('F d, Y') }}

## Summary

| Metric | Value |
|:-------|------:|
| Total Orders | {{ $totalOrders }} |
| Total Sales | ${{ number_format($totalSales, 2) }} |

@if(count($productsSold) > 0)
## Products Sold

| Product | Quantity | Revenue |
|:--------|:--------:|--------:|
@foreach($productsSold as $product)
| {{ $product['name'] }} | {{ $product['quantity'] }} | ${{ number_format($product['revenue'], 2) }} |
@endforeach
@else
No products were sold today.
@endif

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
