import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen({ onLogout }) {
    var [email, setEmail] = useState('');

    useEffect(function() {
        SecureStore.getItemAsync('userEmail')
            .then(function(savedEmail) {
                if (savedEmail) setEmail(savedEmail);
            });
    }, []);

    function handleExitRequest() {
        Alert.alert(
            'Cerrar Sesión',
            '¿Está seguro de que desea salir del sistema Inventy?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar Salida', style: 'destructive', onPress: onLogout }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mi Perfil</Text>
            </View>

            <View style={styles.profileCard}>
                <View style={styles.avatarCircle}>
                    <Ionicons name="person" size={50} color="#1d63ed" />
                </View>
                
                <Text style={styles.userName}>Operador del Sistema</Text>
                <Text style={styles.userEmail}>{email || 'usuario.operario@inventy.com'}</Text>
                
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Rol: Operario</Text>
                </View>
            </View>

            <View style={styles.spacer} />

            <Pressable style={styles.logoutButton} onPress={handleExitRequest}>
                <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { backgroundColor: '#1d63ed', paddingVertical: 16, alignItems: 'center', marginBottom: 30 },
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    profileCard: { alignItems: 'center', paddingHorizontal: 24 },
    avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#eff6ff', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#bfdbfe' },
    userName: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
    userEmail: { fontSize: 15, color: '#64748b', marginTop: 4, marginBottom: 16 },
    badge: { backgroundColor: '#e0f2fe', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
    badgeText: { color: '#0369a1', fontSize: 13, fontWeight: '700' },
    spacer: { flex: 1 },
    logoutButton: { backgroundColor: '#ef4444', marginHorizontal: 24, marginBottom: 20, height: 50, borderRadius: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});