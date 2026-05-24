@extends('layouts.app')

@section('content')

<div class="flex justify-between items-center mb-10">

    <div>

        <h2 class="text-4xl font-black">
            Productos
        </h2>

        <p class="text-slate-500 mt-2">
            Gestión de productos del sistema
        </p>

    </div>

    <a href="{{ route('web.products.create') }}"
       class="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">

        Nuevo Producto

    </a>

</div>

<div class="bg-white rounded-3xl overflow-hidden border border-slate-100">

    <table class="w-full">

        <thead class="bg-slate-50">

            <tr>

                <th class="text-left px-6 py-5 text-xs uppercase text-slate-500">
                    ID
                </th>

                <th class="text-left px-6 py-5 text-xs uppercase text-slate-500">
                    Nombre
                </th>

                <th class="text-left px-6 py-5 text-xs uppercase text-slate-500">
                    Precio
                </th>

                <th class="text-left px-6 py-5 text-xs uppercase text-slate-500">
                    Acciones
                </th>

            </tr>

        </thead>

        <tbody>

            @foreach($products as $product)

                <tr class="border-t border-slate-100 hover:bg-slate-50">

                    <td class="px-6 py-5">
                        {{ $product->id }}
                    </td>

                    <td class="px-6 py-5 font-semibold">
                        {{ $product->name }}
                    </td>

                    <td class="px-6 py-5">
                        ${{ $product->price }}
                    </td>

                    <td class="px-6 py-5 flex gap-2">

                        <a href="{{ route('web.products.edit', $product->id) }}"
                           class="px-4 py-2 rounded-xl bg-amber-100 text-amber-700 font-bold">

                            Editar

                        </a>

                        <form action="{{ route('web.products.destroy', $product->id) }}"
                              method="POST">

                            @csrf
                            @method('DELETE')

                            <button
                                onclick="return confirm('¿Eliminar producto?')"
                                class="px-4 py-2 rounded-xl bg-red-100 text-red-700 font-bold">

                                Eliminar

                            </button>

                        </form>

                    </td>

                </tr>

            @endforeach

        </tbody>

    </table>

</div>

@endsection