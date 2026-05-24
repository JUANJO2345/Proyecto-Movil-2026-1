@extends('layouts.app')

@section('content')

<div class="max-w-3xl mx-auto">

    <h1 class="text-4xl font-black mb-8">
        Nuevo Inventario
    </h1>

    <form action="{{ route('web.inventories.store') }}"
          method="POST"
          class="bg-white p-10 rounded-3xl border border-slate-100 space-y-6">

        @csrf

        <div>
            <label class="font-bold block mb-2">
                Producto
            </label>

            <select name="product_id"
                    class="w-full p-4 rounded-2xl border border-slate-200">

                @foreach($products as $product)

                    <option value="{{ $product->id }}">
                        {{ $product->name }}
                    </option>

                @endforeach

            </select>
        </div>

        <div>
            <label class="font-bold block mb-2">
                Almacén
            </label>

            <select name="warehouse_id"
                    class="w-full p-4 rounded-2xl border border-slate-200">

                @foreach($warehouses as $warehouse)

                    <option value="{{ $warehouse->id }}">
                        {{ $warehouse->name }}
                    </option>

                @endforeach

            </select>
        </div>

        <div>
            <label class="font-bold block mb-2">
                Stock
            </label>

            <input type="number"
                   name="stock"
                   class="w-full p-4 rounded-2xl border border-slate-200">
        </div>

        <button class="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold">
            Guardar
        </button>

    </form>

</div>

@endsection