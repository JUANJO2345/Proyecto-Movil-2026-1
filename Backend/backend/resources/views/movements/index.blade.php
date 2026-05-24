@extends('layouts.app')

@section('content')

<div class="flex justify-between items-center mb-10">

    <h1 class="text-4xl font-black">
        Movimientos
    </h1>

    <a href="{{ route('web.movements.create') }}"
       class="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold">

        Nuevo Movimiento

    </a>

</div>

<div class="bg-white rounded-3xl border overflow-hidden">

    <table class="w-full">

        <thead class="bg-slate-50">

            <tr>

                <th class="p-5 text-left">Producto</th>
                <th class="p-5 text-left">Tipo</th>
                <th class="p-5 text-left">Cantidad</th>
                <th class="p-5 text-left">Usuario</th>
                <th class="p-5 text-right">Acciones</th>

            </tr>

        </thead>

        <tbody>

            @foreach($movements as $movement)

                <tr class="border-t">

                    <td class="p-5">

                        {{ $movement->product->name }}

                    </td>

                    <td class="p-5">

                        {{ $movement->type }}

                    </td>

                    <td class="p-5">

                        {{ $movement->quantity }}

                    </td>

                    <td class="p-5">

                        {{ $movement->user->name }}

                    </td>

                    <td class="p-5">

                        <div class="flex justify-end gap-3">

                            <a href="{{ route('web.movements.edit', $movement->id) }}"
                               class="bg-yellow-500 text-white px-4 py-2 rounded-xl">

                                Editar

                            </a>

                            <form action="{{ route('web.movements.destroy', $movement->id) }}"
                                  method="POST">

                                @csrf
                                @method('DELETE')

                                <button class="bg-red-500 text-white px-4 py-2 rounded-xl">

                                    Eliminar

                                </button>

                            </form>

                        </div>

                    </td>

                </tr>

            @endforeach

        </tbody>

    </table>

</div>

@endsection