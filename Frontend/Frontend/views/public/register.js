import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { register } from '../../services/api'; // Tu servicio fetch centralizado

export default function RegisterScreen({ onLogin, navigation }) {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [loading, setLoading] = useState(false);

    function handleRegisterSubmit() {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor, rellene todos los campos.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);

        register(name, email, password)
            .then(function(result) {
                if (result && result.access_token) {
                    // Guardamos los datos de la sesión automática tras registrarse
                    SecureStore.setItemAsync('userToken', result.access_token);
                    SecureStore.setItemAsync('userEmail', email);

                    if (result.user && result.user.id) {
                        SecureStore.setItemAsync('userId', result.user.id.toString());
                    }

                    // Redirección inmediata al flujo privado mediante el callback del padre
                    if (onLogin) {
                        onLogin(result.access_token);
                    }
                } else {
                    Alert.alert('Error', 'No se pudo completar el registro.');
                }
            })
            .catch(function(error) {
                if (error.responseData) {
                    var apiError = error.responseData;
                    if (apiError.errors && apiError.errors.email) {
                        Alert.alert('Error', apiError.errors.email[0]); // Avisa si el correo ya existe
                    } else {
                        Alert.alert('Error', apiError.message || 'Error al procesar el registro.');
                    }
                } else {
                    Alert.alert('Error', 'No se pudo conectar con el servidor.');
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
                    <Text style={styles.logo}>📝</Text>
                    <Text style={styles.title}>REGISTRO</Text>
                </View>
                <Text style={styles.subtitle}>Crear cuenta de Operario nuevo</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre Completo"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

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
                    placeholder="Contraseña (Mínimo 6)"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <Pressable style={styles.button} onPress={handleRegisterSubmit} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>REGISTRAR CUENTA</Text>
                    )}
                </Pressable>

                <View style={styles.divider} />

                <Pressable 
                    style={styles.buttonSecondary} 
                    onPress={function() { navigation.navigate('Login'); }}
                >
                    <Text style={styles.buttonText}>¿YA TIENES CUENTA? LOGUEATE</Text>
                </Pressable>
            </View>
        </View>
    );
}

// Reutilizamos el mismo diseño estilizado e integrado
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1e3a8a', justifyContent: 'center', alignItems: 'center', padding: 20 },
    card: { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 24, padding: 28, width: '100%', maxWidth: 400, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
    logoContainer: { alignItems: 'center', marginBottom: 8 },
    logo: { fontSize: 54, marginBottom: 4 },
    title: { color: '#fff', fontSize: 28, fontWeight: 'bold', letterSpacing: 2 },
    subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14, textAlign: 'center', marginBottom: 32 },
    input: { width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 14, paddingHorizontal: 18, paddingVertical: 14, marginBottom: 18, color: '#fff', fontSize: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
    button: { backgroundColor: '#10b981', width: '100%', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 6 },
    buttonSecondary: { backgroundColor: '#475569', width: '100%', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 6 },
    buttonText: { color: '#fff', fontSize: 15, fontWeight: 'bold', letterSpacing: 0.5 },
    divider: { width: '80%', height: 1, backgroundColor: 'rgba(255,255,255,0.3)', marginVertical: 20 }
});