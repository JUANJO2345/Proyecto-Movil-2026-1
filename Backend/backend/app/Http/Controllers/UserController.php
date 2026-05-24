<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(
            User::all()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role' => 'required'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role
        ]);

        return response()->json([
            'message' => 'Usuario creado',
            'user' => $user
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            User::findOrFail($id)
        );
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $data = $request->all();

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Usuario actualizado',
            'user' => $user
        ]);
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        // evitar borrar admin principal
        if ($user->role === 'admin') {

            return response()->json([
                'message' => 'No puedes eliminar un administrador'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado'
        ]);
    }
}