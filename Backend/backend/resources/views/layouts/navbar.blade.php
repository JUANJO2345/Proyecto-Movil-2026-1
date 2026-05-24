<header class="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 bg-white/80 backdrop-blur-xl flex justify-between items-center px-8 border-b border-slate-100 z-50">

    <div class="relative w-96">
        <span class="material-symbols-outlined absolute left-4 top-3 text-slate-400">search</span>
        <input type="text" placeholder="Buscar..." class="w-full bg-slate-100 rounded-full py-3 pl-12 pr-4 border-none focus:ring-2 focus:ring-blue-500">
    </div>

    <div class="flex items-center gap-4">
        <button class="text-slate-600 hover:text-slate-800 transition-colors">
            <span class="material-symbols-outlined">notifications</span>
        </button>

        <div class="relative">
            
            <button id="userMenuBtn" class="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-2xl transition-colors focus:outline-none">
                <div class="text-right hidden sm:block">
                    <p class="font-bold text-sm text-slate-800">{{ auth()->user()->name ?? 'Admin' }}</p>
                    <p class="text-xs text-slate-400 capitalize">{{ auth()->user()->role ?? 'Administrador' }}</p>
                </div>

                <div class="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow-sm uppercase">
                    {{ substr(auth()->user()->name ?? 'A', 0, 1) }}
                </div>

                <span id="menuArrow" class="material-symbols-outlined text-slate-400 text-sm transition-transform duration-200">
                    keyboard_arrow_down
                </span>
            </button>

            <div id="userDropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-50">
                <div class="px-4 py-2 border-b border-slate-50 block sm:hidden">
                    <p class="font-bold text-sm text-slate-800">{{ auth()->user()->name ?? 'Admin' }}</p>
                    <p class="text-xs text-slate-400">{{ auth()->user()->role ?? 'Administrador' }}</p>
                </div>

                <a href="#" class="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                    <span class="material-symbols-outlined text-lg">person</span>
                    Mi Perfil
                </a>

                <hr class="border-slate-100 my-1">

                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors text-left">
                        <span class="material-symbols-outlined text-lg">logout</span>
                        Cerrar Sesión
                    </button>
                </form>
            </div>

        </div>
    </div>
</header>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('userMenuBtn');
    const dropdown = document.getElementById('userDropdown');
    const arrow = document.getElementById('menuArrow');

    // Alternar el menú al hacer clic en el botón
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    });

    // Cerrar el menú si se hace clic en cualquier otra parte de la pantalla
    document.addEventListener('click', function (e) {
        if (!dropdown.classList.contains('hidden') && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    });
});
</script>