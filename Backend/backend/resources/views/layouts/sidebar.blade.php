<aside class="h-screen w-64 fixed left-0 top-0 bg-slate-50/80 backdrop-blur-md flex flex-col p-6 gap-4 border-r border-slate-100">

    <div class="flex items-center gap-3 mb-8">

        <img src="{{ asset('img/mi-logo.jpg') }}" 
             alt="Inventy Pro Logo" 
             class="h-10 w-auto object-contain">

        </div>

    <nav class="flex flex-col gap-2">

        <a href="/dashboard"
           class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-200/50">
            <span class="material-symbols-outlined">dashboard</span>
            Dashboard
        </a>

        <a href="/products"
           class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-200/50">
            <span class="material-symbols-outlined">inventory_2</span>
            Productos
        </a>

        <a href="/categories"
           class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-200/50">
            <span class="material-symbols-outlined">category</span>
            Categorías
        </a>

        <a href="/suppliers"
           class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-200/50">
            <span class="material-symbols-outlined">local_shipping</span>
            Proveedores
        </a>

        <a href="/warehouses"
           class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-200/50">
            <span class="material-symbols-outlined">warehouse</span>
            Bodegas
        </a>

        <a href="/inventories"
           class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-200/50">
            <span class="material-symbols-outlined">analytics</span>
            Inventario
        </a>

        <a href="/movements"
           class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-200/50">
            <span class="material-symbols-outlined">swap_horiz</span>
            Movimientos
        </a>

        <a href="/users"
           class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-200/50">
            <span class="material-symbols-outlined">group</span>
            Usuarios
        </a>

    </nav>

</aside>