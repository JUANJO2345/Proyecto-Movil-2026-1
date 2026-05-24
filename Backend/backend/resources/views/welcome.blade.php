@extends('layouts.app')

@section('content')

<div class="mb-10">

    <h1 class="text-5xl font-black text-slate-900">
        Dashboard Inventy
    </h1>

    <p class="text-slate-500 mt-3 text-lg">
        Sistema de gestión de inventario
    </p>

</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div class="bg-white rounded-3xl p-8 border border-slate-100">

        <p class="text-slate-500 text-sm uppercase font-bold">
            Productos
        </p>

        <h2 class="text-4xl font-black mt-4">
            120
        </h2>

    </div>

    <div class="bg-white rounded-3xl p-8 border border-slate-100">

        <p class="text-slate-500 text-sm uppercase font-bold">
            Inventario
        </p>

        <h2 class="text-4xl font-black mt-4">
            540
        </h2>

    </div>

    <div class="bg-white rounded-3xl p-8 border border-slate-100">

        <p class="text-slate-500 text-sm uppercase font-bold">
            Movimientos
        </p>

        <h2 class="text-4xl font-black mt-4">
            86
        </h2>

    </div>

</div>

@endsection