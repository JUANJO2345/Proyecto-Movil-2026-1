<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\ProductControllerWeb;
use App\Http\Controllers\Web\CategoryControllerWeb;
use App\Http\Controllers\Web\SupplierControllerWeb;
use App\Http\Controllers\Web\WarehouseControllerWeb;
use App\Http\Controllers\Web\InventoryControllerWeb;
use App\Http\Controllers\Web\MovementControllerWeb;

Route::get('/', function () {
    return view('welcome');
});
Route::resource('products', ProductControllerWeb::class);
Route::resource('categories', CategoryControllerWeb::class);
Route::resource('suppliers', SupplierControllerWeb::class);
Route::resource('warehouses', WarehouseControllerWeb::class);
Route::resource('inventory', InventoryControllerWeb::class);
Route::resource('movements', MovementControllerWeb::class);