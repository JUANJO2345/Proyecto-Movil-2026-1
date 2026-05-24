<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Web\AuthControllerWeb;

use App\Http\Controllers\Web\ProductControllerWeb;
use App\Http\Controllers\Web\CategoryControllerWeb;
use App\Http\Controllers\Web\SupplierControllerWeb;
use App\Http\Controllers\Web\WarehouseControllerWeb;
use App\Http\Controllers\Web\InventoryControllerWeb;
use App\Http\Controllers\Web\MovementControllerWeb;
use App\Http\Controllers\Web\UserControllerWeb;
use App\Http\Controllers\Web\DashboardController;

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
Route::get('/test-auth', function () {

    return auth()->user();

});

Route::get(
    '/',
    [AuthControllerWeb::class, 'loginForm']
)->name('login');

Route::post(
    '/login',
    [AuthControllerWeb::class, 'login']
)->name('login.post');

Route::post(
    '/logout',
    [AuthControllerWeb::class, 'logout']
)->name('logout');

/*
|--------------------------------------------------------------------------
| PANEL ADMIN
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get(
        '/dashboard',
        [DashboardController::class, 'index']
    )->name('web.dashboard');
    Route::resource(
    'products',
    ProductControllerWeb::class
)->names('web.products');
    Route::resource(
    'categories',
    CategoryControllerWeb::class
)->names('web.categories');

Route::resource(
    'suppliers',
    SupplierControllerWeb::class
)->names('web.suppliers');

Route::resource(
    'warehouses',
    WarehouseControllerWeb::class
)->names('web.warehouses');

Route::resource(
    'inventories',
    InventoryControllerWeb::class
)->names('web.inventories');

Route::resource(
    'movements',
    MovementControllerWeb::class
)->names('web.movements');

Route::resource(
    'users',
    UserControllerWeb::class
)->names('web.users');
});