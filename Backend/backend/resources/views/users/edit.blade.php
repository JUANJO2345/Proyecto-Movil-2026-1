@extends('layouts.app')

@section('content')

<div class="max-w-3xl mx-auto">

    <h1 class="text-4xl font-black mb-8">
        Editar Usuario
    </h1>

    <form action="{{ route('web.users.update', $user->id) }}"
          method="POST"
          class="bg-white p-10 rounded-3xl border border-slate-100 space-y-6">

        @csrf
        @method('PUT')

        <div>
            <label class="font-bold block mb-2">
                Nombre
            </label>

            <input type="text"
                   name="name"
                   value="{{ $user->name }}"
                   class="w-full p-4 rounded-2xl border border-slate-200"
                   required>
        </div>

        <div>
            <label class="font-bold block mb-2">
                Email
            </label>

            <input type="email"
                   name="email"
                   value="{{ $user->email }}"
                   class="w-full p-4 rounded-2xl border border-slate-200"
                   required>
        </div>

        <div>
            <label class="font-bold block mb-2">
                Rol del Sistema
            </label>

            <select name="role" 
                    class="w-full p-4 rounded-2xl border border-slate-200 bg-white" 
                    required>
                <option value="admin" {{ $user->role == 'admin' ? 'selected' : '' }}>
                    Administrador (Acceso Panel Web Monolito)
                </option>
                <option value="operator" {{ $user->role == 'operator' ? 'selected' : '' }}>
                    Operador (Acceso Aplicación Móvil)
                </option>
            </select>
        </div>

        <button class="bg-yellow-500 text-white px-8 py-4 rounded-2xl font-bold">
            Actualizar
        </button>

    </form>

</div>

@endsection