<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;

use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;

use Illuminate\Http\Request;

class ProductControllerWeb extends Controller
{
    public function index()
    {
        $products = Product::with([
            'category',
            'supplier'
        ])->get();

        return view('products.index', compact('products'));
    }

    public function create()
    {
        $categories = Category::all();
        $suppliers = Supplier::all();

        return view('products.create', compact(
            'categories',
            'suppliers'
        ));
    }

    public function store(Request $request)
    {
        Product::create($request->all());

        return redirect()->route('web.products.index');
    }

    public function show(string $id)
    {
        $product = Product::findOrFail($id);

        return view('web.products.show', compact('product'));
    }

    public function edit(string $id)
    {
        $product = Product::findOrFail($id);

        $categories = Category::all();
        $suppliers = Supplier::all();

        return view('products.edit', compact(
            'product',
            'categories',
            'suppliers'
        ));
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $product->update($request->all());

        return redirect()->route('web.products.index');
    }

    public function destroy(string $id)
    {
        Product::destroy($id);

        return redirect()->route('web.products.index');
    }
}