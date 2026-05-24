<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//Importamos los controladores de la API
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\MovementController;
//Aqui va el controlador de usuarios y la autenticacion
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/test', function () {
    return response()->json([
        'message' => 'API funcionando'
    ]);
});
Route::apiResource('/categories', CategoryController::class);
Route::apiResource('/products', ProductController::class);
Route::apiResource('/suppliers', SupplierController::class);
Route::apiResource('/warehouses', WarehouseController::class);
Route::apiResource('/inventories', InventoryController::class);
Route::apiResource('/movements', MovementController::class);
Route::apiResource('/users', UserController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});