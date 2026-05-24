<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        return response()->json(
            Supplier::all()
        );
    }

    public function store(Request $request)
    {
        $supplier = Supplier::create($request->all());

        return response()->json([
            'message' => 'Proveedor creado',
            'supplier' => $supplier
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Supplier::findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $supplier = Supplier::findOrFail($id);

        $supplier->update($request->all());

        return response()->json([
            'message' => 'Proveedor actualizado',
            'supplier' => $supplier
        ]);
    }

    public function destroy(string $id)
    {
        Supplier::destroy($id);

        return response()->json([
            'message' => 'Proveedor eliminado'
        ]);
    }
}