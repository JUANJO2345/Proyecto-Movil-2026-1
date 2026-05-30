<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // 🔥 EL SECRETO: El constructor obliga a Laravel a tratar todo como JSON
    public function __construct(Request $request)
    {
        // Forzamos a que la petición se comporte como si tuviera el Header 'Accept: application/json'
        $request->headers->set('Accept', 'application/json');
    }

    // REGISTER
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación en el registro.',
                'errors' => $e->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'operator' 
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 201);
    }

    // LOGIN
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'El formato del correo o la contraseña no es válido.',
                'errors' => $e->errors()
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Error de autenticación.',
                'errors' => [
                    'email' => ['Las credenciales proporcionadas son incorrectas.']
                ]
            ], 401);
        }

        $user = User::where('email', $request->email)->first();

        if (strtolower($user->role) === 'admin') {
            Auth::logout(); 

            return response()->json([
                'message' => 'Acceso denegado.',
                'errors' => [
                    'role' => ['Los administradores no tienen permitido el acceso a la aplicación móvil.']
                ]
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login exitoso',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 200);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout exitoso'
        ], 200);
    }

    // USUARIO AUTENTICADO
    public function me(Request $request)
    {
        if (!$request->user()) {
            return response()->json([
                'message' => 'No autenticado.',
                'errors' => [
                    'token' => ['El token de autenticación es inválido o ha expirado.']
                ]
            ], 401);
        }

        return response()->json($request->user(), 200);
    }
}
