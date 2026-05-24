@extends('layouts.app')

@section('content')

<div class="max-w-2xl mx-auto">

    <h1 class="text-4xl font-black mb-10">
        Editar Categoría
    </h1>

    <form action="{{ route('web.categories.update', $category->id) }}"
          method="POST"
          class="bg-white p-10 rounded-3xl border border-slate-100 space-y-6">

        @csrf
        @method('PUT')

        <div>

            <label class="block mb-2 font-bold">
                Nombre
            </label>

            <input type="text"
                   name="name"
                   value="{{ $category->name }}"
                   class="w-full rounded-2xl border border-slate-200 p-4">

        </div>

        <button class="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold">

            Actualizar

        </button>

    </form>

</div>

@endsection