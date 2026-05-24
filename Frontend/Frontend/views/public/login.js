import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../../services/api';

export default function LoginScreen({ onLogin, navigation }) {
    // Hooks de estado locales de la vista
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [loading, setLoading] = useState(false);

    function handleLoginSubmit() {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor ingresa email y contraseña');
            return;
        }

        setLoading(true);

        // Consumimos tu servicio fetch nativo
        login(email, password)
            .then(function(result) {
                if (result && result.access_token) {
                    // Guardamos el token y el email de forma segura en el dispositivo
                    SecureStore.setItemAsync('userToken', result.access_token);
                    SecureStore.setItemAsync('userEmail', email);

                    // Guardamos el ID del operario si viene en la respuesta
                    if (result.user && result.user.id) {
                        SecureStore.setItemAsync('userId', result.user.id.toString());
                    }

                    // 🔥 LE AVISAMOS AL PADRE (App.js) para cambiar al Stack Privado
                    onLogin(result.access_token);
                } else {
                    Alert.alert('Error', result.message || 'Credenciales inválidas');
                }
            })
            .catch(function(error) {
                if (error.responseData) {
                    var apiError = error.responseData;
                    if (apiError.errors && apiError.errors.email) {
                        Alert.alert('Error', apiError.errors.email[0]);
                    } else if (apiError.errors && apiError.errors.role) {
                        Alert.alert('Acceso Denegado', apiError.errors.role[0]); // El bloqueo al Admin
                    } else {
                        Alert.alert('Error', apiError.message || 'Error al iniciar sesión.');
                    }
                } else {
                    Alert.alert('Error', 'No se pudo conectar con el servidor. Revisa tu conexión.');
                }
            })
            .finally(function() {
                setLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>📦</Text>
                    <Text style={styles.title}>INVENTY</Text>
                </View>
                <Text style={styles.subtitle}>Aplicación Móvil - Operarios</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <Pressable style={styles.button} onPress={handleLoginSubmit} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>INICIO DE SESIÓN</Text>
                    )}
                </Pressable>

                <View style={styles.divider} />

                <Pressable 
                    style={styles.buttonSecondary} 
                    onPress={function() { navigation.navigate('Register'); }}
                >
                    <Text style={styles.buttonText}>REGISTRARSE</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1e3a8a', justifyContent: 'center', alignItems: 'center', padding: 20 },
    card: { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 24, padding: 28, width: '100%', maxWidth: 400, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
    logoContainer: { alignItems: 'center', marginBottom: 8 },
    logo: { fontSize: 54, marginBottom: 4 },
    title: { color: '#fff', fontSize: 28, fontWeight: 'bold', letterSpacing: 2 },
    subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14, textAlign: 'center', marginBottom: 32 },
    input: { width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 14, paddingHorizontal: 18, paddingVertical: 14, marginBottom: 18, color: '#fff', fontSize: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
    button: { backgroundColor: '#2563eb', width: '100%', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 6 },
    buttonSecondary: { backgroundColor: '#475569', width: '100%', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 6 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
    divider: { width: '80%', height: 1, backgroundColor: 'rgba(255,255,255,0.3)', marginVertical: 20 }
});