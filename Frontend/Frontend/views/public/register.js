import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { register } from '../../services/api'; 
import { AuthContext } from '../../context/AuthContext';

export default function RegisterScreen({ navigation }) {
    var { loginState } = useContext(AuthContext);

    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConfirmation, setPasswordConfirmation] = useState('');
    
    var [loading, setLoading] = useState(false);
    var [error, setError] = useState('');

    function handleRegister() {
        setError('');

        if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirmation.trim()) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        if (password !== passwordConfirmation) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        register(name, email, password, passwordConfirmation)
            .then(function (res) {
                // Captura flexible: 'token' o 'access_token'
                var token = res.token || res.access_token;
                if (token) {
                    Alert.alert('Éxito', 'Cuenta de operario creada correctamente.');
                    loginState(token);
                } else {
                    setError('Error en la respuesta del servidor.');
                }
            })
            .catch(function (err) {
                if (err?.errors) {
                    setError(Object.values(err.errors).flat()[0]);
                } else {
                    setError('Error al registrarse. Inténtalo de nuevo.');
                }
            })
            .finally(function () {
                setLoading(false);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Nuevo Operario</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <Text style={styles.label}>Nombre Completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Juan Pérez"
                        placeholderTextColor="#94a3b8"
                        value={name}
                        onChangeText={setName}
                    />

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
                        placeholder="Mínimo 6 caracteres"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Text style={styles.label}>Confirmar Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Repite tu contraseña"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry={true}
                        value={passwordConfirmation}
                        onChangeText={setPasswordConfirmation}
                    />

                    <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrar e Ingresar</Text>}
                    </Pressable>

                    <Pressable style={styles.loginLink} onPress={function() { navigation.goBack(); }}>
                        <Text style={styles.loginLinkText}>¿Ya tienes cuenta? Inicia sesión</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    scrollContainer: { padding: 24, justifyContent: 'center', flexGrow: 1 },
    card: { backgroundColor: '#fff', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#f1f5f9', elevation: 2 },
    cardTitle: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 6, marginTop: 12 },
    input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, paddingHorizontal: 16, fontSize: 15, color: '#334155', backgroundColor: '#fff' },
    button: { backgroundColor: '#1d63ed', width: '100%', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    errorText: { color: '#ef4444', backgroundColor: '#fee2e2', padding: 12, borderRadius: 8, fontSize: 14, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
    loginLink: { marginTop: 16, alignItems: 'center' },
    loginLinkText: { color: '#1d63ed', fontSize: 14, fontWeight: '600' }
});