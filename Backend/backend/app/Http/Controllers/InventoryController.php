<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        $inventory = Inventory::with([
            'product',
            'warehouse'
        ])->get();

        return response()->json($inventory);
    }

    public function store(Request $request)
    {
        $inventory = Inventory::create($request->all());

        return response()->json([
            'message' => 'Inventario creado',
            'inventory' => $inventory
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Inventory::with([
                'product',
                'warehouse'
            ])->findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $inventory = Inventory::findOrFail($id);

        $inventory->update($request->all());

        return response()->json([
            'message' => 'Inventario actualizado',
            'inventory' => $inventory
        ]);
    }

    public function destroy(string $id)
    {
        Inventory::destroy($id);

        return response()->json([
            'message' => 'Inventario eliminado'
        ]);
    }
}