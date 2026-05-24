<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    public function index()
    {
        return response()->json(
            Warehouse::all()
        );
    }

    public function store(Request $request)
    {
        $warehouse = Warehouse::create($request->all());

        return response()->json([
            'message' => 'Bodega creada',
            'warehouse' => $warehouse
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Warehouse::findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $warehouse = Warehouse::findOrFail($id);

        $warehouse->update($request->all());

        return response()->json([
            'message' => 'Bodega actualizada',
            'warehouse' => $warehouse
        ]);
    }

    public function destroy(string $id)
    {
        Warehouse::destroy($id);

        return response()->json([
            'message' => 'Bodega eliminada'
        ]);
    }
}