@extends('layouts.app')

@section('content')

<div class="max-w-3xl mx-auto">

    <h1 class="text-4xl font-black mb-8">
        Editar Movimiento
    </h1>

    <form action="{{ route('web.movements.update', $movement->id) }}"
          method="POST"
          class="bg-white p-10 rounded-3xl border border-slate-100 space-y-6">

        @csrf
        @method('PUT')

        <div>
            <label class="font-bold block mb-2">
                Tipo
            </label>

            <select name="type"
                    class="w-full p-4 rounded-2xl border border-slate-200">

                <option value="entrada"
                    {{ $movement->type == 'entrada' ? 'selected' : '' }}>
                    Entrada
                </option>

                <option value="salida"
                    {{ $movement->type == 'salida' ? 'selected' : '' }}>
                    Salida
                </option>

            </select>
        </div>

        <div>
            <label class="font-bold block mb-2">
                Cantidad
            </label>

            <input type="number"
                   name="quantity"
                   value="{{ $movement->quantity }}"
                   class="w-full p-4 rounded-2xl border border-slate-200">
        </div>

        <button class="bg-yellow-500 text-white px-8 py-4 rounded-2xl font-bold">
            Actualizar
        </button>

    </form>

</div>

@endsection