<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseControllerWeb extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::all();

        return view(
            'warehouses.index',
            compact('warehouses')
        );
    }

    public function create()
    {
        return view('warehouses.create');
    }

    public function store(Request $request)
    {
        Warehouse::create($request->all());

        return redirect()
            ->route('web.warehouses.index');
    }

    public function edit(string $id)
    {
        $warehouse = Warehouse::findOrFail($id);

        return view(
            'warehouses.edit',
            compact('warehouse')
        );
    }

    public function update(Request $request, string $id)
    {
        $warehouse = Warehouse::findOrFail($id);

        $warehouse->update($request->all());

        return redirect()
            ->route('web.warehouses.index');
    }

    public function destroy(string $id)
    {
        $warehouse = Warehouse::findOrFail($id);

        $warehouse->delete();

        return redirect()
            ->route('web.warehouses.index');
    }
}