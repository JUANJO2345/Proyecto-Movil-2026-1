<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class InventoryControllerWeb extends Controller
{
    public function index()
    {
        $inventories = Inventory::with([
            'product',
            'warehouse'
        ])->get();

        return view(
            'inventories.index',
            compact('inventories')
        );
    }

    public function create()
    {
        $products = Product::all();
        $warehouses = Warehouse::all();

        return view(
            'inventories.create',
            compact(
                'products',
                'warehouses'
            )
        );
    }

    public function store(Request $request)
    {
        Inventory::create($request->all());

        return redirect()
            ->route('web.inventories.index');
    }

    public function edit(string $id)
    {
        $inventory = Inventory::findOrFail($id);

        $products = Product::all();
        $warehouses = Warehouse::all();

        return view(
            'inventories.edit',
            compact(
                'inventory',
                'products',
                'warehouses'
            )
        );
    }

    public function update(Request $request, string $id)
    {
        $inventory = Inventory::findOrFail($id);

        $inventory->update($request->all());

        return redirect()
            ->route('web.inventories.index');
    }

    public function destroy(string $id)
    {
        $inventory = Inventory::findOrFail($id);

        $inventory->delete();

        return redirect()
            ->route('web.inventories.index');
    }
}