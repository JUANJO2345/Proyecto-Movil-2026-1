@extends('layouts.app')

@section('content')

<div class="max-w-3xl mx-auto">

    <div class="mb-10">

        <h1 class="text-4xl font-black">
            Nuevo Producto
        </h1>

        <p class="text-slate-500 mt-2">
            Crear un nuevo producto
        </p>

    </div>

    <form action="{{ route('web.products.store') }}" method="POST"
          class="bg-white p-10 rounded-3xl border border-slate-100 space-y-6">

        @csrf

        <div>

            <label class="block mb-2 font-bold">
                Nombre
            </label>

            <input type="text"
                   name="name"
                   class="w-full rounded-2xl border border-slate-200 p-4">

        </div>

        <div>

            <label class="block mb-2 font-bold">
                Descripción
            </label>

            <textarea name="description"
                      rows="4"
                      class="w-full rounded-2xl border border-slate-200 p-4"></textarea>

        </div>

        <div>

            <label class="block mb-2 font-bold">
                Precio
            </label>

            <input type="number"
                   step="0.01"
                   name="price"
                   class="w-full rounded-2xl border border-slate-200 p-4">

        </div>

        <div>

            <label class="block mb-2 font-bold">
                Categoría
            </label>

            <select name="category_id"
                    class="w-full rounded-2xl border border-slate-200 p-4">

                @foreach($categories as $category)

                    <option value="{{ $category->id }}">

                        {{ $category->name }}

                    </option>

                @endforeach

            </select>

        </div>

        <div>

            <label class="block mb-2 font-bold">
                Proveedor
            </label>

            <select name="supplier_id"
                    class="w-full rounded-2xl border border-slate-200 p-4">

                @foreach($suppliers as $supplier)

                    <option value="{{ $supplier->id }}">

                        {{ $supplier->name }}

                    </option>

                @endforeach

            </select>

        </div>

        <button class="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg">

            Guardar Producto

        </button>

    </form>

</div>

@endsection