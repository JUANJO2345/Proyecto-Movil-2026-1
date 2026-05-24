<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    // LISTAR
    public function index()
    {
        $products = Product::with([
            'category',
            'supplier'
        ])->get();

        return response()->json($products);
    }

    // CREAR
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required',
            'supplier_id' => 'required'
        ]);

        $product = Product::create($request->all());

        return response()->json([
            'message' => 'Producto creado',
            'product' => $product
        ], 201);
    }

    // MOSTRAR UNO
    public function show(string $id)
    {
        $product = Product::with([
            'category',
            'supplier'
        ])->findOrFail($id);

        return response()->json($product);
    }

    // ACTUALIZAR
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $product->update($request->all());

        return response()->json([
            'message' => 'Producto actualizado',
            'product' => $product
        ]);
    }

    // ELIMINAR
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado'
        ]);
    }
}