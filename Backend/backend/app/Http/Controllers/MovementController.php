<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Movement;
use Illuminate\Http\Request;

class MovementController extends Controller
{
    public function index()
    {
        $movements = Movement::with([
            'user',
            'product',
            'warehouse'
        ])->get();

        return response()->json($movements);
    }

    public function store(Request $request)
    {
        $movement = Movement::create($request->all());

        return response()->json([
            'message' => 'Movimiento creado',
            'movement' => $movement
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Movement::with([
                'user',
                'product',
                'warehouse'
            ])->findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $movement = Movement::findOrFail($id);

        $movement->update($request->all());

        return response()->json([
            'message' => 'Movimiento actualizado',
            'movement' => $movement
        ]);
    }

    public function destroy(string $id)
    {
        Movement::destroy($id);

        return response()->json([
            'message' => 'Movimiento eliminado'
        ]);
    }
}