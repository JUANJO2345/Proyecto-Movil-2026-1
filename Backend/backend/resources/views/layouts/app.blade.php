<!DOCTYPE html>
<html class="light" lang="es">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Inventy</title>

    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

    <script>
        tailwind.config = {
            darkMode: "class",

            theme: {

                extend: {

                    colors: {
                        primary: "#135dba",
                        surface: "#f8f9fa",
                        "surface-container-low": "#f1f4f5",
                        "surface-container-high": "#e5e9eb",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#2d3335",
                        error: "#a83836",
                    },

                    fontFamily: {
                        headline: ["Manrope"],
                        body: ["Inter"]
                    },

                    borderRadius: {
                        DEFAULT: "1rem",
                        xl: "2rem",
                    }
                }
            }
        }
    </script>

    <style>

        body {
            font-family: 'Inter', sans-serif;
            background: #f8f9fa;
        }

        h1,h2,h3,h4 {
            font-family: 'Manrope', sans-serif;
        }

        .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
        }

    </style>

</head>

<body class="bg-surface text-on-surface">

    @include('layouts.sidebar')

    <main class="ml-64 min-h-screen">

        @include('layouts.navbar')

        <div class="pt-28 p-10">

            @yield('content')

        </div>

    </main>

</body>

</html>