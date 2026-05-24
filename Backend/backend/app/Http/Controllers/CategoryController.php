<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(
            Category::all()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $category = Category::create($request->all());

        return response()->json([
            'message' => 'Categoría creada',
            'category' => $category
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Category::findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $category->update($request->all());

        return response()->json([
            'message' => 'Categoría actualizada',
            'category' => $category
        ]);
    }

    public function destroy(string $id)
    {
        Category::destroy($id);

        return response()->json([
            'message' => 'Categoría eliminada'
        ]);
    }
}