import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ onLogout }) {
    var [userEmail, setUserEmail] = useState('');
    var [userId, setUserId] = useState('');
    var [loading, setLoading] = useState(true);

    // Al cargar el Dashboard, recuperamos los datos informativos que guardamos en el Login
    useEffect(function () {
        Promise.all([
            SecureStore.getItemAsync('userEmail'),
            SecureStore.getItemAsync('userId')
        ])
        .then(function (results) {
            if (results[0]) setUserEmail(results[0]);
            if (results[1]) setUserId(results[1]);
        })
        .catch(function (error) {
            console.log('Error al recuperar datos del usuario:', error);
        })
        .finally(function () {
            setLoading(false);
        });
    }, []);

    function handleLogoutClick() {
        Alert.alert(
            'Cerrar Sesión',
            '¿Está seguro de que desea salir de la aplicación?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Salir', 
                    style: 'destructive',
                    onPress: function() {
                        if (onLogout) {
                            onLogout(); // Ejecuta el callback de App.js para limpiar el token
                        }
                    }
                }
            ]
        );
    }

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Cabecera del Panel */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>INVENTY PANEL</Text>
                <Pressable style={styles.logoutButton} onPress={handleLogoutClick}>
                    <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                </Pressable>
            </View>

            {/* Tarjeta de Información del Operario */}
            <View style={styles.card}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarIcon}>👷‍♂️</Text>
                </View>
                <Text style={styles.welcomeText}>¡Bienvenido de vuelta!</Text>
                <Text style={styles.roleText}>Rol: Operario de Inventario</Text>
                
                <View style={styles.divider} />
                
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>ID Operario:</Text>
                    <Text style={styles.infoValue}>{userId || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Correo:</Text>
                    <Text style={styles.infoValue}>{userEmail || 'No detectado'}</Text>
                </View>
            </View>

            {/* Zona de Trabajo / Próximos módulos */}
            <View style={styles.workZone}>
                <Text style={styles.sectionTitle}>Módulos Disponibles</Text>
                
                <View style={styles.placeholderModule}>
                    <Ionicons name="barcode-outline" size={32} color="#475569" />
                    <Text style={styles.placeholderModuleText}>
                        Aquí se listarán tus productos y CRUDs en la Entrega 2.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', paddingHorizontal: 20, paddingTop: 50 },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    headerTitle: { fontSize: 22, fontWeight: '900', color: '#1e3a8a', letterSpacing: 1 },
    logoutButton: { padding: 8, backgroundColor: '#fee2e2', borderRadius: 12 },
    card: { backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
    avatarContainer: { width: 70, height: 70, backgroundColor: '#eff6ff', borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
    avatarIcon: { fontSize: 36 },
    welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
    roleText: { fontSize: 14, color: '#2563eb', fontWeight: '600', marginTop: 4 },
    divider: { width: '100%', height: 1, backgroundColor: '#f1f5f9', marginVertical: 18 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
    infoLabel: { fontSize: 14, color: '#64748b', fontWeight: '500' },
    infoValue: { fontSize: 14, color: '#334155', fontWeight: '700' },
    workZone: { marginTop: 30, flex: 1 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#475569', marginBottom: 15 },
    placeholderModule: { flex: 1, maxHeight: 150, backgroundColor: '#f1f5f9', borderRadius: 16, borderWidth: 2, borderColor: '#cbd5e1', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', padding: 20 },
    placeholderModuleText: { color: '#64748b', fontSize: 14, textAlign: 'center', marginTop: 10, fontWeight: '500', lineHeight: 20 }
});