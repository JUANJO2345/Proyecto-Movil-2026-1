Juan Jose Arias Maestre - 1067593165
Nota: Para el diseño de la pagina web se uso la herramienta STITCH de google y para la aplicacion movil se hizo en MIRO


Inventy - Sistema de Gestión de Inventarios y StockInventy es una plataforma para la gestión de inventarios y control de stock. 
El proyecto está dividido en dos componentes principales: un panel de administración web que funciona como backend y monolito para parametrización, y una aplicación móvil nativa para la operación diaria de los usuarios.  
Estructura General del Repositorio
El repositorio está organizado en las siguientes carpetas principales:  
- Backend: Monolito desarrollado en Laravel que incluye el panel de administración web y la API RestFul protegida.
- Frontend: Aplicación móvil multiplataforma desarrollada en React Native con Expo.  
Requisitos Globales del Sistema 
- Base de Datos: El sistema cuenta con un modelo relacional de mínimo seis tablas (sin incluir la tabla nativa de usuarios) relacionadas entre sí para soportar la lógica de negocio del inventario.  
- Patrón de Diseño: El frontend móvil está construido bajo la arquitectura Model-View-ViewModel (MVVM), garantizando una separación de responsabilidades.  
- Seguridad y Roles: Existe una separación de accesos. El usuario administrador gestiona el sistema desde el monolito web , mientras que los usuarios operativos acceden a través de la app móvil mediante tokens seguros.  
Sección 1: 
Backend y API (Laravel)Este componente se encarga de la persistencia de datos, la lógica de negocio, las operaciones CRUD del administrador y de exponer los endpoints de la API RestFul para el consumo móvil.  
Requisitos Previos
Laragon con PHP (versión 8.2 o superior) y MySQL activosComposerNode.js y NPM
Instalación y DespliegueNavegar al directorio del backend:
cd Backend  
Instalar dependencias de PHP:
composer install  
Instalar dependencias de Node:
npm install  
Configurar el entorno:
cp .env.example .envphp 
artisan key:generateConfigurar 
Base de Datos en Laragon:
Crea una base de datos vacía en tu gestor de Laragon (HeidiSQL o phpMyAdmin). 
Luego configura las siguientes líneas en tu archivo .env:DB_CONNECTION=mysqlDB_HOST=127.0.0.1DB_PORT=3306DB_DATABASE=nombre_de_tu_base_de_datosDB_USERNAME=rootDB_PASSWORD=
Ejecutar Migraciones y Seeders:
Crea las tablas del sistema (mínimo 6 tablas), las de Laravel Sanctum y carga los usuarios de prueba iniciales:
php artisan migrate --seed  
Compilar Assets y levantar entorno:
npm run dev  
Capa de Seguridad
Middlewares: Filtros aplicados para restringir el acceso a las vistas protegidas del monolito y asegurar las rutas de la API.  
Sanctum: Las rutas en routes/api.php están protegidas con auth:sanctum para autenticar peticiones de la app móvil.
Sección 2: Aplicación Móvil (React Native y Expo)
Aplicación enfocada en el usuario operativo para interactuar con el catálogo de productos y los movimientos de stock en tiempo real.
Requisitos Previos
Node.js (versión 18 o superior)
Emulador de Android/iOS o la aplicación Expo Go en un dispositivo físico
Instalación y Despliegue
Navegar al directorio del frontend:cd Frontend
Instalar el framework base de Expo:npm install
Instalar las dependencias de navegación y almacenamiento seguro:npx expo install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context expo-secure-store
Configurar la URL de la API:Modifica el archivo de servicios para apuntar a la IP local de tu máquina donde corre Laravel, ya que los emuladores o teléfonos no reconocen localhost o .test directamente:// ./services/api.jsconst API_URL = 'http://TU_IP_LOCAL:8000/api';
Ejecutar en desarrollo:npx expo start
Escanea el código QR que aparece en la terminal con la app Expo Go desde tu celular.
Ambos dispositivos deben estar conectados a la misma red Wi-Fi.
Arquitectura del Código (MVVM)El proyecto distribuye sus responsabilidades de la siguiente forma:
context: Manejo de estado global de autenticación (AuthContext.js) mediante el hook useContext.
services (Model): Abstracción de datos, fetch HTTP y comunicación con el backend (api.js).
views (View): Componentes puros de interfaz gráfica y enrutamiento con React Navigation.
public: Vistas de acceso libre como Login, Registro de usuario.
private: Vistas protegidas que requieren token válido como Catálogo, Perfil y Movimientos de Stock.
Notas de Red Local para PruebasPara garantizar que la app móvil se comunique con el backend de Laravel de forma local, ejecuta el servidor del backend exponiendo el host en la red:php artisan serve --host=0.0.0.0
Si experimentas errores de conexión, verifica que el Firewall de tu sistema operativo no esté bloqueando el puerto 8000.
