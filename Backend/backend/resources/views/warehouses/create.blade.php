@extends('layouts.app')

@section('content')

<div class="max-w-3xl mx-auto">

    <h1 class="text-4xl font-black mb-8">
        Nuevo Almacén
    </h1>

    <form action="{{ route('web.warehouses.store') }}"
          method="POST"
          class="bg-white p-10 rounded-3xl border border-slate-100 space-y-6">

        @csrf

        <div>
            <label class="font-bold block mb-2">
                Nombre
            </label>

            <input type="text"
                   name="name"
                   class="w-full p-4 rounded-2xl border border-slate-200">
        </div>

        <div>
            <label class="font-bold block mb-2">
                Ubicación
            </label>

            <input type="text"
                   name="location"
                   class="w-full p-4 rounded-2xl border border-slate-200">
        </div>

        <button class="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold">
            Guardar
        </button>

    </form>

</div>

@endsection