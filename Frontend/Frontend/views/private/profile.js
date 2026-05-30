import React, { useContext, useState, useEffect } from 'react'; // 👈 Añadimos useState y useEffect
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'; // 👈 Añadimos ActivityIndicator para el estado de carga
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext'; 
import { getMe } from '../../services/api'; // 👈 Importamos tu función del archivo de servicios (Model)

export default function ProfileScreen() {
    // 💡 Extraemos logoutState y el token guardado en el contexto global
    var { logoutState, userToken } = useContext(AuthContext); 

    // 🏛️ Estados locales (ViewModel interno de la vista)
    var [userData, setUserData] = useState(null);
    var [loading, setLoading] = useState(true);

    // 🔄 Efecto para traer los datos de Laravel Sanctum al cargar la pantalla
    useEffect(function () {
        if (userToken) {
            getMe(userToken)
                .then(function (data) {
                    setUserData(data);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.error("Error al obtener perfil:", error);
                    setLoading(false);
                });
        }
    }, [userToken]);

    // ⏳ Si está cargando los datos de la API, muestra un indicador de carga limpio
    if (loading) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#1d63ed" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mi Perfil</Text>
            </View>

            <View style={styles.avatarContainer}>
                <View style={styles.avatarCircle}>
                    <Ionicons name="person" size={50} color="#1d63ed" />
                </View>
                
                {/* 👤 Muestra el nombre real de la base de datos de Laravel, si falla pone un valor por defecto */}
                <Text style={styles.userName}>
                    {userData && userData.name ? userData.name : 'Operario No Identificado'}
                </Text>
                
                {/* 🔑 Muestra el rol dinámico o el correo electrónico del operario */}
                <Text style={styles.userRole}>
                    {userData && userData.email ? userData.email : 'Control de Stock e Inventarios'}
                </Text>
            </View>

            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <Ionicons name="shield-checkmark-outline" size={20} color="#64748b" style={styles.icon} />
                    <View>
                        <Text style={styles.infoLabel}>Estado de Sesión</Text>
                        <Text style={styles.infoValue}>Autenticado vía Laravel Sanctum</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="phone-portrait-outline" size={20} color="#64748b" style={styles.icon} />
                    <View>
                        <Text style={styles.infoLabel}>Dispositivo Sincronizado</Text>
                        <Text style={styles.infoValue}>Terminal Móvil Local</Text>
                    </View>
                </View>
            </View>

            <View style={styles.spacer} />

            <Pressable 
                style={styles.logoutButton} 
                onPress={function() { logoutState(); }}
            >
                <Ionicons name="log-out-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.logoutButtonText}>Cerrar Sesión Segura</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    center: { justifyContent: 'center', alignItems: 'center' }, // 👈 Centrar el cargador
    header: { padding: 24, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    headerTitle: { fontSize: 26, fontWeight: '900', color: '#0f172a' },
    avatarContainer: { alignItems: 'center', marginTop: 30, marginBottom: 24 },
    avatarCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#e0f2fe', justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#bae6fd' },
    userName: { fontSize: 22, fontWeight: '800', color: '#0f172a' },
    userRole: { fontSize: 14, color: '#64748b', marginTop: 2, fontWeight: '500' },
    infoCard: { backgroundColor: '#fff', marginHorizontal: 24, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#f1f5f9', elevation: 1 },
    infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
    icon: { marginRight: 16 },
    infoLabel: { fontSize: 12, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' },
    infoValue: { fontSize: 15, fontWeight: '600', color: '#334155', marginTop: 2 },
    spacer: { flex: 1 },
    logoutButton: { backgroundColor: '#ef4444', marginHorizontal: 24, marginBottom: 24, height: 52, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 2 },
    logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' }
});