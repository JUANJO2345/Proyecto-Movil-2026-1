<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Inventy Login</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

    <style>

        body {
            font-family: 'Inter', sans-serif;
            background: #f8f9fa;
        }

        h1 {
            font-family: 'Manrope', sans-serif;
        }

    </style>

</head>

<body class="min-h-screen flex items-center justify-center">

    <div class="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-100">

        <div class="text-center mb-8">

            <h1 class="text-5xl font-black text-blue-700">
                Inventy
            </h1>

            <p class="text-slate-500 mt-3">
                Panel Administrador
            </p>

        </div>

        @if(session('error'))

            <div class="bg-red-100 text-red-700 p-3 rounded-xl mb-4">

                {{ session('error') }}

            </div>

        @endif

        <form action="{{ route('login.post') }}"
              method="POST"
              class="space-y-5">

            @csrf

            <div>

                <label class="block mb-2 font-semibold">
                    Correo
                </label>

                <input type="email"
                       name="email"
                       class="w-full rounded-2xl border border-slate-200 p-4 focus:ring-2 focus:ring-blue-500"
                       required>

            </div>

            <div>

                <label class="block mb-2 font-semibold">
                    Contraseña
                </label>

                <input type="password"
                       name="password"
                       class="w-full rounded-2xl border border-slate-200 p-4 focus:ring-2 focus:ring-blue-500"
                       required>

            </div>

            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all">

                Iniciar Sesión

            </button>

        </form>

    </div>

</body>

</html>