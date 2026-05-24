<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // LOGIN WEB
    public function login(Request $request)
{
    // 1. Validar campos
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    // 2. Intentar autenticar de forma tradicional
    if (!Auth::attempt($request->only('email', 'password'))) {
        return redirect()->back()
            ->withInput($request->only('email'))
            ->with('error', 'Las credenciales proporcionadas no coinciden con nuestros registros.');
    }

    // 3. Obtener el usuario autenticado
    $user = Auth::user();

    /**
     * 🔍 PRUEBA DE DIAGNÓSTICO TEMPORAL:
     * Quita las dos barras (//) de la línea de abajo para congelar el login 
     * y ver en pantalla qué rol tiene exactamente el usuario que intentas probar.
     */
    // dd($user->role); 


    // 4. VALIDACIÓN DE ROL: Convertimos a minúsculas para evitar fallos de mayúsculas
    if (strtolower($user->role) !== 'admin') {
        Auth::logout(); // Destruimos la sesión inmediatamente

        return redirect()->back()
            ->withInput($request->only('email'))
            ->with('error', 'Acceso denegado. Solo los administradores pueden ingresar aquí.');
    }

    // 5. Si es admin, regenerar sesión y continuar
    $request->session()->regenerate();

    return redirect()->route('web.dashboard'); 
}
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}