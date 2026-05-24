import React, { useContext } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // 📏 Importación necesaria

// Importamos el Contexto Global
import { AuthProvider, AuthContext } from './context/AuthContext';

// Vistas Públicas
import LoginScreen from './views/public/login';
import RegisterScreen from './views/public/register';

// Vistas Privadas
import ProductsListScreen from './views/private/productsList'; 
import ProductDetailScreen from './views/private/productDetail';
import MovementsScreen from './views/private/movements';
import ProfileScreen from './views/private/profile'; 

var Stack = createStackNavigator();
var Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProductsList" component={ProductsListScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </Stack.Navigator>
    );
}

function PrivateTabs() {
    return (
        <Tab.Navigator
            screenOptions={function({ route }) {
                return {
                    headerShown: false,
                    tabBarActiveTintColor: '#1d63ed',
                    tabBarInactiveTintColor: '#64748b',
                    tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 10 },
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
            <Tab.Screen name="InicioTab" component={HomeStack} options={{ title: 'Inicio' }} />
            <Tab.Screen name="Movimientos" component={MovementsScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function NavigationWrapper() {
    var { userToken, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#1d63ed" />
            </View>
        );
    }

    return (
        // 🛡️ SafeAreaView envuelve todo el flujo para proteger los bordes (notch, home indicator, etc.)
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userToken == null ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : (
                    <Stack.Screen name="PrivateHome" component={PrivateTabs} />
                )}
            </Stack.Navigator>
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <AuthProvider>
                    <NavigationWrapper />
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

var styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }
});