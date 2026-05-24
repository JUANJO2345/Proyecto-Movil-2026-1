@extends('layouts.app')

@section('content')

<div class="max-w-2xl mx-auto">

    <h1 class="text-4xl font-black mb-10">
        Nuevo Proveedor
    </h1>

    <form action="{{ route('web.suppliers.store') }}"
          method="POST"
          class="bg-white p-10 rounded-3xl border space-y-6">

        @csrf

        <input type="text"
               name="name"
               placeholder="Nombre"
               class="w-full p-4 rounded-2xl border">

        <input type="email"
               name="email"
               placeholder="Email"
               class="w-full p-4 rounded-2xl border">

        <button class="bg-blue-600 text-white px-8 py-4 rounded-2xl">

            Guardar

        </button>

    </form>

</div>

@endsection