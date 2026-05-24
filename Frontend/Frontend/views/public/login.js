import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../../services/api'; // Ajusta esta ruta según la ubicación de tu api.js
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
    // 💡 Consumimos la acción 'loginState' de nuestro Contexto Global
    var { loginState } = useContext(AuthContext); 

    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [loading, setLoading] = useState(false);
    var [error, setError] = useState('');

    function handleLogin() {
        setError('');
        if (!email.trim() || !password.trim()) {
            setError('Por favor, rellena todos los campos.');
            return;
        }

        setLoading(true);
        
        login(email, password)
            .then(function (res) {
                // 🔍 CONTROL DE AUDITORÍA: Ver en la terminal de Expo qué responde Laravel exactamente
                console.log("=== RESPUESTA DE TU API DE LARAVEL ===", res);

                // 🔀 DETECTOR FLEXIBLE: Captura tanto 'res.token' como 'res.access_token'
                var tokenEncontrado = res.token || res.access_token;

                if (tokenEncontrado) {
                    // Envía el token al AuthContext. El contexto actualiza App.js y te redirige solo.
                    loginState(tokenEncontrado); 
                } else {
                    setError('Respuesta del servidor no válida. No se encontró la propiedad del token.');
                }
            })
            .catch(function (err) {
                console.log("Error capturado en Login:", err);
                setError(err.message || 'Error de conexión. Revisa tus credenciales.');
            })
            .finally(function () {
                setLoading(false);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.brandContainer}>
                    <Text style={styles.logoText}>Inventy</Text>
                    <Text style={styles.subtitle}>Gestión de Inventarios Móvil</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Iniciar Sesión</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <Text style={styles.label}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="operario@inventy.com"
                        placeholderTextColor="#94a3b8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Ingresar al Sistema</Text>}
                    </Pressable>

                    <Pressable style={styles.registerLink} onPress={function() { navigation.navigate('Register'); }}>
                        <Text style={styles.registerLinkText}>¿No tienes cuenta? Regístrate aquí</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    scrollContainer: { padding: 24, justifyContent: 'center', flexGrow: 1 },
    brandContainer: { alignItems: 'center', marginBottom: 32 },
    logoText: { fontSize: 42, fontWeight: '900', color: '#1d63ed' },
    subtitle: { fontSize: 16, color: '#64748b', marginTop: 4, fontWeight: '500' },
    card: { backgroundColor: '#fff', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#f1f5f9', elevation: 2 },
    cardTitle: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 6, marginTop: 12 },
    input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, paddingHorizontal: 16, fontSize: 15, color: '#334155', backgroundColor: '#fff' },
    button: { backgroundColor: '#1d63ed', width: '100%', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    errorText: { color: '#ef4444', backgroundColor: '#fee2e2', padding: 12, borderRadius: 8, fontSize: 14, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
    registerLink: { marginTop: 16, alignItems: 'center' },
    registerLinkText: { color: '#1d63ed', fontSize: 14, fontWeight: '600' }
});