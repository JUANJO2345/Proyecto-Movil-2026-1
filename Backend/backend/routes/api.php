<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Importamos los controladores de la API
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\MovementController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS DE LA API
|--------------------------------------------------------------------------
*/

// Test básico para verificar que el servidor responde
Route::get('/test', function () {
    return response()->json([
        'message' => 'API funcionando perfectamente'
    ]);
});

// Rutas de autenticación iniciales para la App Móvil
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


/*
|--------------------------------------------------------------------------
| RUTAS PRIVADAS / PROTEGIDAS (Exigen Token Válido de Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Información del usuario logueado en la app
    Route::get('/me', [AuthController::class, 'me']);
    
    // Cierre de sesión en el dispositivo móvil
    Route::post('/logout', [AuthController::class, 'logout']);

    // 🔒 RECURSOS CRUD BLINDADOS PARA LA ENTREGA 2
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/products', ProductController::class);
    Route::apiResource('/suppliers', SupplierController::class);
    Route::apiResource('/warehouses', WarehouseController::class);
    Route::apiResource('/inventories', InventoryController::class);
    Route::apiResource('/movements', MovementController::class);
    Route::apiResource('/users', UserController::class);

});