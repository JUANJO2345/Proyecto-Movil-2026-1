@extends('layouts.app')

@section('content')

<div class="max-w-3xl mx-auto">

    <h1 class="text-4xl font-black mb-8">
        Nuevo Movimiento
    </h1>

    @if ($errors->any())
        <div class="bg-red-100 text-red-600 p-4 rounded-2xl mb-6 font-bold">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>• {{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('web.movements.store') }}"
          method="POST"
          class="bg-white p-10 rounded-3xl border border-slate-100 space-y-6">

        @csrf

        <div>
            <label class="font-bold block mb-2">
                Producto
            </label>

            <select name="product_id"
                    id="product_select"
                    class="w-full p-4 rounded-2xl border border-slate-200" required>
                
                <option value="">-- Selecciona un producto --</option>
                
                @foreach($products as $product)
                    <option value="{{ $product->id }}" data-inventories="{{ json_encode($product->inventories) }}">
                        {{ $product->name }}
                    </option>
                @endforeach

            </select>
        </div>

        <div>
            <label class="font-bold block mb-2">
                Inventario
            </label>

            <select name="inventory_id"
                    id="inventory_select"
                    class="w-full p-4 rounded-2xl border border-slate-200" disabled required>
                
                <option value="">-- Primero selecciona un producto --</option>

            </select>
        </div>

        <div>
            <label class="font-bold block mb-2">
                Tipo
            </label>

            <select name="type"
                    class="w-full p-4 rounded-2xl border border-slate-200" required>

                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>

            </select>
        </div>

        <div>
            <label class="font-bold block mb-2">
                Cantidad
            </label>

            <input type="number"
                   name="quantity"
                   min="1"
                   class="w-full p-4 rounded-2xl border border-slate-200" required>
        </div>

        <button class="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
            Guardar
        </button>

    </form>

</div>

{{-- Script para controlar la lógica dinámica del Select --}}
<script>
document.addEventListener('DOMContentLoaded', function () {
    const productSelect = document.getElementById('product_select');
    const inventorySelect = document.getElementById('inventory_select');

    productSelect.addEventListener('change', function () {
        // 1. Limpiar las opciones anteriores del select de inventarios
        inventorySelect.innerHTML = '<option value="">-- Selecciona un inventario --</option>';
        
        // Obtener la opción seleccionada
        const selectedOption = this.options[this.selectedIndex];
        
        // 2. Si no hay producto seleccionado, deshabilitar el campo
        if (!selectedOption.value || !selectedOption.getAttribute('data-inventories')) {
            inventorySelect.disabled = true;
            return;
        }

        // 3. Extraer los inventarios adjuntos al producto en el JSON
        const inventories = JSON.parse(selectedOption.getAttribute('data-inventories'));

        // 4. Si el producto tiene inventarios asignados, los dibujamos
        if (inventories.length > 0) {
            inventories.forEach(inventory => {
                const option = document.createElement('option');
                option.value = inventory.id;
                
                // OJO: Aquí usa el nombre real de tu columna (inventory.nombre, inventory.name, etc.)
                option.textContent = inventory.nombre || inventory.name || `Inventario #${inventory.id}`; 
                
                inventorySelect.appendChild(option);
            });
            
            // Habilitar el select
            inventorySelect.disabled = false;
        } else {
            // Si el producto no está en stock/inventario en ningún lugar
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "Este producto no tiene inventarios asignados";
            inventorySelect.appendChild(option);
            inventorySelect.disabled = true;
        }
    });
});
</script>

@endsection