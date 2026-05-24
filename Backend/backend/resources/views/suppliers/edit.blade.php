@extends('layouts.app')

@section('content')

<div class="max-w-2xl mx-auto">

    <h1 class="text-4xl font-black mb-10">
        Editar Proveedor
    </h1>

    <form action="{{ route('web.suppliers.update', $supplier->id) }}"
          method="POST"
          class="bg-white p-10 rounded-3xl border space-y-6">

        @csrf
        @method('PUT')

        <input type="text"
               name="name"
               value="{{ $supplier->name }}"
               class="w-full p-4 rounded-2xl border">

        <input type="email"
               name="email"
               value="{{ $supplier->email }}"
               class="w-full p-4 rounded-2xl border">

        <button class="bg-blue-600 text-white px-8 py-4 rounded-2xl">

            Actualizar

        </button>

    </form>

</div>

@endsection