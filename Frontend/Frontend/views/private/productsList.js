import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Para esquivar la barra de arriba
import * as SecureStore from 'expo-secure-store';
import { getProducts } from '../../services/api';

export default function ProductsListScreen({ navigation }) {
    var [products, setProducts] = useState([]);
    var [loading, setLoading] = useState(true);

    useEffect(function () {
        SecureStore.getItemAsync('userToken').then(function (token) {
            getProducts(token)
                .then(function (data) { setProducts(data); })
                .catch(function (err) { console.log(err); })
                .finally(function () { setLoading(false); });
        });
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#1d63ed" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Cabecera superior controlada */}
            <View style={styles.header}>
                <View style={styles.avatarMini}>
                    <Text style={styles.avatarText}>U</Text>
                </View>
                <Text style={styles.headerText}>Hola operario</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Lista de productos</Text>

            {/* FlatList con contentContainerStyle para dejar un margen abajo y no pisar los Tabs */}
            <FlatList
                data={products}
                keyExtractor={function (item) { return item.id.toString(); }}
                contentContainerStyle={styles.listContent}
                renderItem={function ({ item }) {
                    return (
                        <View style={styles.productRow}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Pressable 
                                style={styles.detailButton}
                                onPress={function() { navigation.navigate('ProductDetail', { product: item }); }}
                            >
                                <Text style={styles.detailButtonText}>Detalles</Text>
                            </Pressable>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#fff',
        paddingHorizontal: 20 
    },
    center: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 15,
        marginBottom: 20 
    },
    avatarMini: { 
        width: 40, 
        height: 40, 
        backgroundColor: '#1d63ed', 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 12 
    },
    avatarText: {
        color: '#fff', 
        fontWeight: 'bold',
        fontSize: 16
    },
    headerText: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#1e293b' 
    },
    sectionTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#0f172a', 
        marginBottom: 16 
    },
    listContent: {
        paddingBottom: 30 // Colchón de aire para que el último producto no toque los botones inferiores
    },
    productRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingVertical: 16, 
        borderBottomWidth: 1, 
        borderBottomColor: '#f1f5f9' 
    },
    productName: { 
        fontSize: 16, 
        color: '#334155', 
        fontWeight: '500',
        flex: 1, // Evita que nombres largos pisen el botón
        marginRight: 10
    },
    detailButton: { 
        backgroundColor: '#1d63ed', 
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        borderRadius: 20 
    },
    detailButtonText: { 
        color: '#fff', 
        fontSize: 14, 
        fontWeight: '600' 
    }
});