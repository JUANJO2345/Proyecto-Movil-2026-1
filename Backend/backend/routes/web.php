<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
| CLASE FILTRO DE SEGURIDAD (MIDDLEWARE)
|--------------------------------------------------------------------------
*/
class SoloAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // CORRECCIÓN: Comparamos contra 'admin', tal como está en tu UserSeeder
        if (Auth::check() && strtolower(Auth::user()->role) !== 'admin') {
            Auth::logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login')
                ->with('error', 'Acceso denegado. Solo los administradores pueden ingresar aquí.');
        }

        return $next($request);
    }
}

/*
|--------------------------------------------------------------------------
| LOGIN & RUTAS PÚBLICAS
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
| PANEL ADMIN (PROTEGIDO)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', SoloAdminMiddleware::class])->group(function () {

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