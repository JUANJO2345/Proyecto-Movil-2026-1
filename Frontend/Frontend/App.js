import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 📏 Solución para solapamientos de Android

// Vistas Públicas
import LoginScreen from './views/public/login';
import RegisterScreen from './views/public/register';

// Vistas Privadas (Estructuradas según tus Wireframes)
import ProductsListScreen from './views/private/productsList'; 
import ProductDetailScreen from './views/private/productDetail';
import MovementsScreen from './views/private/movements';
import ProfileScreen from './views/private/profile'; 

var Stack = createStackNavigator();
var Tab = createBottomTabNavigator();

// --- MENÚ INFERIOR (Pestañas Privadas con protección de área segura) ---
function PrivateTabs({ route }) {
    var onLogout = route.params.onLogout;
    var insets = useSafeAreaInsets(); // Detecta la altura de los botones físicos/virtuales de Android

    return (
        <Tab.Navigator
            screenOptions={function({ route }) {
                return {
                    headerShown: false,
                    tabBarActiveTintColor: '#1d63ed', // Azul corporativo de Inventy
                    tabBarInactiveTintColor: '#64748b',
                    // Diseño controlado para esquivar la botonera del sistema operativo
                    tabBarStyle: { 
                        height: 65 + (insets.bottom > 0 ? insets.bottom - 10 : 0), 
                        paddingBottom: insets.bottom > 0 ? insets.bottom : 10,       
                        paddingTop: 10,
                        backgroundColor: '#fff',
                        borderTopWidth: 1,
                        borderTopColor: '#f1f5f9',
                        elevation: 8 // Sombra leve en Android
                    },
                    tabBarIcon: function({ color }) {
                        var iconName;
                        if (route.name === 'InicioTab') iconName = 'home-outline';
                        else if (route.name === 'Movimientos') iconName = 'arrow-forward-outline';
                        else if (route.name === 'Perfil') iconName = 'person-outline';
                        
                        return <Ionicons name={iconName} size={22} color={color} />;
                    }
                };
            }}
        >
            {/* Sub-stack interno para permitir el flujo: Lista -> Ver Detalles */}
            <Tab.Screen name="InicioTab" options={{ title: 'Inicio' }}>
                {function() {
                    return (
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="ProductsList" component={ProductsListScreen} />
                            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                        </Stack.Navigator>
                    );
                }}
            </Tab.Screen>

            <Tab.Screen name="Movimientos" component={MovementsScreen} />
            
            <Tab.Screen name="Perfil">
                {function (props) {
                    return <ProfileScreen {...props} onLogout={onLogout} />;
                }}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

// --- COMPONENTE PRINCIPAL (Guardián de Rutas Clásico) ---
export default function App() {
    // Forzamos el estado inicial en null para que siempre inicie obligatoriamente en el Login
    var [userToken, setUserToken] = useState(null);

    // Método que se activa al loguearse o registrarse con éxito
    function handleLoginSuccess(token) {
        setUserToken(token); // Al actualizarse, destruye el Login y monta el menú privado
    }

    // Método que destruye la sesión y el token del almacenamiento físico
    function handleLogoutSuccess() {
        SecureStore.deleteItemAsync('userToken')
            .then(function() {
                setUserToken(null); // Nos regresa al Login instantáneamente
            });
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userToken == null ? (
                    // 🔓 El usuario no está autenticado (Flujo Público Obligatorio)
                    <>
                        <Stack.Screen name="Login">
                            {function (props) { return <LoginScreen {...props} onLogin={handleLoginSuccess} />; }}
                        </Stack.Screen>
                        <Stack.Screen name="Register">
                            {function (props) { return <RegisterScreen {...props} onLogin={handleLoginSuccess} />; }}
                        </Stack.Screen>
                    </>
                ) : (
                    // 🔒 El usuario pasó el Login con éxito (Flujo Operario Privado)
                    <Stack.Screen 
                        name="PrivateHome" 
                        component={PrivateTabs} 
                        initialParams={{ onLogout: handleLogoutSuccess }} 
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}