@extends('layouts.app')

@section('content')

<div class="flex justify-between items-center mb-10">

    <h1 class="text-4xl font-black">
        Bodegas
    </h1>

    <a href="{{ route('web.warehouses.create') }}"
       class="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold">

        Nueva Bodega

    </a>

</div>

<div class="bg-white rounded-3xl border overflow-hidden">

    <table class="w-full">

        <thead class="bg-slate-50">

            <tr>

                <th class="p-5 text-left">Nombre</th>
                <th class="p-5 text-left">Ubicación</th>
                <th class="p-5 text-right">Acciones</th>

            </tr>

        </thead>

        <tbody>

            @foreach($warehouses as $warehouse)

                <tr class="border-t">

                    <td class="p-5">{{ $warehouse->name }}</td>
                    <td class="p-5">{{ $warehouse->location }}</td>

                    <td class="p-5">

                        <div class="flex justify-end gap-3">

                            <a href="{{ route('web.warehouses.edit', $warehouse->id) }}"
                               class="bg-yellow-500 text-white px-4 py-2 rounded-xl">

                                Editar

                            </a>

                            <form action="{{ route('web.warehouses.destroy', $warehouse->id) }}"
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