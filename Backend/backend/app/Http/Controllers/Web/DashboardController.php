<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Movement;
use App\Models\Inventory;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Métricas clave para las tarjetas (Cards)
        $totalProducts = Product::count();
        $totalInventories = Inventory::count();
        
        // Asumiendo que tienes una columna 'stock' o sumas las cantidades de los movimientos
        $totalMovements = Movement::count(); 
        
        // 2. Obtener los últimos 5 movimientos para mostrar una mini-tabla
        $recentMovements = Movement::with(['product', 'user'])
            ->latest()
            ->take(5)
            ->get();

        return view('dashboard.index', compact(
            'totalProducts',
            'totalInventories',
            'totalMovements',
            'recentMovements'
        ));
    }
}