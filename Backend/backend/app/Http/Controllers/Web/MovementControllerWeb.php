<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Movement;
use App\Models\Product;
use App\Models\User;
use App\Models\Inventory;
use Illuminate\Http\Request;

class MovementControllerWeb extends Controller
{
    public function index()
    {
        $movements = Movement::with([
            'product',
            'user'
        ])->get();

        return view(
            'movements.index',
            compact('movements')
        );
    }

    public function create()
    {
        $products = Product::all();
        $users = User::all();
        $inventories = Inventory::all();

        return view(
            'movements.create',
            compact(
                'products',
                'inventories',
                'users'
            )
        );
    }

    public function store(Request $request)
    {
        Movement::create([
            'product_id' => $request->product_id,
            'inventory_id' => $request->inventory_id,
            'user_id' => auth()->user()->id,
            'type' => $request->type,
            'quantity' => $request->quantity,
        ]);

        return redirect()->route('web.movements.index');
    }

    public function edit(string $id)
    {
        $movement = Movement::findOrFail($id);

        $products = Product::all();
        $users = User::all();

        return view(
            'movements.edit',
            compact(
                'movement',
                'products',
                'users'
            )
        );
    }

    public function update(Request $request, string $id)
    {
        $movement = Movement::findOrFail($id);

        $movement->update($request->all());

        return redirect()
            ->route('web.movements.index');
    }

    public function destroy(string $id)
    {
        $movement = Movement::findOrFail($id);

        $movement->delete();

        return redirect()
            ->route('web.movements.index');
    }
}