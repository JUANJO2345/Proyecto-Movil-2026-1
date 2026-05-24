@extends('layouts.app')

@section('content')

<div class="flex justify-between items-center mb-10">

    <h1 class="text-4xl font-black">
        Inventario
    </h1>

    <a href="{{ route('web.inventories.create') }}"
       class="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold">

        Nuevo Registro

    </a>

</div>

<div class="bg-white rounded-3xl border overflow-hidden">

    <table class="w-full">

        <thead class="bg-slate-50">

            <tr>

                <th class="p-5 text-left">Producto</th>
                <th class="p-5 text-left">Bodega</th>
                <th class="p-5 text-left">Stock</th>
                <th class="p-5 text-right">Acciones</th>

            </tr>

        </thead>

        <tbody>

            @foreach($inventories as $inventory)

                <tr class="border-t">

                    <td class="p-5">

                        {{ $inventory->product->name }}

                    </td>

                    <td class="p-5">

                        {{ $inventory->warehouse->name }}

                    </td>

                    <td class="p-5">

                        {{ $inventory->stock }}

                    </td>

                    <td class="p-5">

                        <div class="flex justify-end gap-3">

                            <a href="{{ route('web.inventories.edit', $inventory->id) }}"
                               class="bg-yellow-500 text-white px-4 py-2 rounded-xl">

                                Editar

                            </a>

                            <form action="{{ route('web.inventories.destroy', $inventory->id) }}"
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