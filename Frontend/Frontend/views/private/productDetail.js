import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailScreen({ route, navigation }) {
    var product = route.params?.product;

    if (!product) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.errorText}>No se seleccionó ningún producto.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={function() { navigation.goBack(); }}>
                    <Ionicons name="arrow-back-outline" size={24} color="#fff" />
                </Pressable>
                <Text style={styles.headerTitle}>Detalles del Producto</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.contentCard}>
                <View style={styles.infoGroup}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.value}>{product.name}</Text>
                </View>

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>Precio:</Text>
                    <Text style={styles.value}>${product.price || '0.00'}</Text>
                </View>

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>Descripción:</Text>
                    <Text style={styles.valueDescription}>{product.description || '[Sin descripción disponible por el momento].'}</Text>
                </View>
            </View>

            <Pressable 
                style={styles.actionButton}
                onPress={function() { 
                    navigation.navigate('Movimientos', { defaultProduct: product }); 
                }}
            >
                <Text style={styles.actionButtonText}>Registrar Movimiento</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1d63ed', paddingVertical: 14, paddingHorizontal: 16 },
    backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    contentCard: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
    infoGroup: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    label: { fontSize: 16, fontWeight: '600', color: '#64748b', marginBottom: 4 },
    value: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
    valueDescription: { fontSize: 15, color: '#334155', lineHeight: 22 },
    actionButton: { backgroundColor: '#1d63ed', marginHorizontal: 24, marginBottom: 20, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
    actionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    errorText: { fontSize: 16, color: '#ef4444', fontWeight: '500' }
});