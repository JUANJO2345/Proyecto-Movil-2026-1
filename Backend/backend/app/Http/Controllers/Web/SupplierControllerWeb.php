<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierControllerWeb extends Controller
{
    public function index()
    {
        $suppliers = Supplier::all();

        return view(
            'suppliers.index',
            compact('suppliers')
        );
    }

    public function create()
    {
        return view('suppliers.create');
    }

    public function store(Request $request)
    {
        Supplier::create($request->all());

        return redirect()
            ->route('web.suppliers.index');
    }

    public function edit(string $id)
    {
        $supplier = Supplier::findOrFail($id);

        return view(
            'suppliers.edit',
            compact('supplier')
        );
    }

    public function update(Request $request, string $id)
    {
        $supplier = Supplier::findOrFail($id);

        $supplier->update($request->all());

        return redirect()
            ->route('web.suppliers.index');
    }

    public function destroy(string $id)
    {
        $supplier = Supplier::findOrFail($id);

        $supplier->delete();

        return redirect()
            ->route('web.suppliers.index');
    }
}