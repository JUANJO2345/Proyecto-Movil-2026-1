@extends('layouts.app')

@section('content')
<div class="max-w-7xl mx-auto space-y-10">
    
    <div>
        <h1 class="text-4xl font-black mb-2">Dashboard</h1>
        <p class="text-slate-500">Bienvenido al sistema de gestión de Inventy Pro.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="bg-white p-8 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
            <div>
                <span class="text-slate-400 font-bold block mb-1 text-sm uppercase tracking-wider">Productos</span>
                <span class="text-4xl font-black text-slate-800">{{ $totalProducts }}</span>
            </div>
            <div class="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
            <div>
                <span class="text-slate-400 font-bold block mb-1 text-sm uppercase tracking-wider">Bodegas</span>
                <span class="text-4xl font-black text-slate-800">{{ $totalInventories }}</span>
            </div>
            <div class="bg-green-50 text-green-600 p-4 rounded-2xl">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
            <div>
                <span class="text-slate-400 font-bold block mb-1 text-sm uppercase tracking-wider">Movimientos</span>
                <span class="text-4xl font-black text-slate-800">{{ $totalMovements }}</span>
            </div>
            <div class="bg-purple-50 text-purple-600 p-4 rounded-2xl">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
            </div>
        </div>

    </div>

    <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-black">Últimos Movimientos</h2>
            <a href="{{ route('web.movements.index') }}" class="text-blue-600 font-bold text-sm hover:underline">
                Ver todos →
            </a>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-slate-100 text-slate-400 text-sm font-bold">
                        <th class="pb-4">Producto</th>
                        <th class="pb-4">Tipo</th>
                        <th class="pb-4">Cantidad</th>
                        <th class="pb-4">Usuario</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 text-slate-700">
                    @forelse($recentMovements as $movement)
                        <tr>
                            <td class="py-4 font-medium">{{ $movement->product->name }}</td>
                            <td class="py-4">
                                <span class="px-3 py-1 rounded-full text-xs font-bold {{ $movement->type === 'entrada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' }}">
                                    {{ ucfirst($movement->type) }}
                                </span>
                            </td>
                            <td class="py-4 font-bold">{{ $movement->quantity }}</td>
                            <td class="py-4 text-slate-500">{{ $movement->user->name ?? 'Administrador' }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="py-8 text-center text-slate-400">No hay movimientos registrados recientemente.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection