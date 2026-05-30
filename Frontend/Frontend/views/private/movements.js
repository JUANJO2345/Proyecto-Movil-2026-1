import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker'; 
import * as SecureStore from 'expo-secure-store';
import { getProducts, getInventories, storeMovement, getMe } from '../../services/api'; 

export default function MovementsScreen({ route }) {
    // --- CATÁLOGOS GLOBALES ---
    var [productsList, setProductsList] = useState([]);
    var [globalInventories, setGlobalInventories] = useState([]);

    // --- ESTADOS DEL FORMULARIO ---
    var [selectedProductId, setSelectedProductId] = useState('');
    var [filteredInventories, setFilteredInventories] = useState([]);
    var [selectedInventoryId, setSelectedInventoryId] = useState('');
    var [movementType, setMovementType] = useState('entrada');
    var [quantity, setQuantity] = useState('');

    // --- CONTROL ---
    var [loadingInitial, setLoadingInitial] = useState(true);
    var [loadingSubmit, setLoadingSubmit] = useState(false);
    var [validationErrors, setValidationErrors] = useState([]);

    // 1. DESCARGA INICIAL
    useEffect(function () {
        SecureStore.getItemAsync('userToken').then(function (token) {
            Promise.all([getProducts(token), getInventories(token)])
                .then(function (results) {
                    setProductsList(results[0] || []);
                    setGlobalInventories(results[1] || []);
                })
                .catch(function (err) {
                    setValidationErrors(['Error al sincronizar catálogos.']);
                })
                .finally(function () {
                    setLoadingInitial(false);
                });
        });
    }, []);

    // 2. FILTRADO DE INVENTARIOS
    useEffect(function () {
        if (!selectedProductId) {
            setFilteredInventories([]);
            setSelectedInventoryId('');
            return;
        }

        var matches = globalInventories.filter(function (inv) {
            // Aceptamos ambas nomenclaturas por seguridad
            var pid = inv.product_id || inv.producto_id;
            return String(pid) === String(selectedProductId);
        });

        setFilteredInventories(matches);
        if (matches.length > 0) {
            setSelectedInventoryId(String(matches[0].id));
        } else {
            setSelectedInventoryId('');
        }
    }, [selectedProductId, globalInventories]);

    // 3. NAVEGACIÓN
    useEffect(function () {
        var defaultProduct = route.params?.defaultProduct;
        if (defaultProduct && productsList.length > 0) {
            setSelectedProductId(String(defaultProduct.id));
        }
    }, [route.params?.defaultProduct, productsList]);

    // 4. GUARDAR MOVIMIENTO
    function handleSaveMovement() {
        setValidationErrors([]);
        var errors = [];
        if (!selectedProductId) errors.push('Debe seleccionar un producto.');
        if (!selectedInventoryId && filteredInventories.length > 0) errors.push('Debe seleccionar un inventario.');
        if (!quantity.trim() || parseInt(quantity, 10) <= 0) errors.push('La cantidad debe ser mayor a 0.');

        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        setLoadingSubmit(true);

        SecureStore.getItemAsync('userToken').then(function (token) {
            // Obtenemos ID de usuario fresco antes de enviar
            return getMe(token).then(function (user) {
                var payload = {
                    user_id: user.id,
                    product_id: parseInt(selectedProductId, 10),
                    inventory_id: selectedInventoryId ? parseInt(selectedInventoryId, 10) : null,
                    type: movementType,
                    quantity: parseInt(quantity, 10)
                };
                return storeMovement(token, payload);
            });
        })
        .then(function () {
            Alert.alert('Éxito', 'Movimiento registrado correctamente.');
            setSelectedProductId('');
            setQuantity('');
        })
        .catch(function (error) {
            console.error(error);
            setValidationErrors(['Error al guardar el registro en el servidor.']);
        })
        .finally(function () {
            setLoadingSubmit(false);
        });
    }

    if (loadingInitial) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#1d63ed" />
                <Text style={styles.loadingText}>Cargando...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.mainTitle}>Nuevo Movimiento</Text>
                
                {validationErrors.map((err, idx) => <Text key={idx} style={styles.errorText}>• {err}</Text>)}

                <View style={styles.formCard}>
                    <Text style={styles.label}>Producto</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker selectedValue={selectedProductId} onValueChange={setSelectedProductId}>
                            <Picker.Item label="-- Selecciona --" value="" color="#94a3b8" />
                            {productsList.map(p => <Picker.Item key={p.id} label={p.name} value={String(p.id)} />)}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Inventario</Text>
                    <View style={[styles.pickerWrapper, !selectedProductId && styles.pickerDisabled]}>
                        <Picker selectedValue={selectedInventoryId} onValueChange={setSelectedInventoryId} enabled={!!selectedProductId}>
                            {!selectedProductId ? <Picker.Item label="Selecciona un producto primero" value="" />
                            : filteredInventories.length === 0 ? <Picker.Item label="Sin inventarios disponibles" value="" />
                            : filteredInventories.map(inv => <Picker.Item key={inv.id} label={inv.name || 'Almacén #' + inv.id} value={String(inv.id)} />)}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Tipo</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker selectedValue={movementType} onValueChange={setMovementType}>
                            <Picker.Item label="Entrada" value="entrada" />
                            <Picker.Item label="Salida" value="salida" />
                        </Picker>
                    </View>

                    <Text style={styles.label}>Cantidad</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} />

                    <Pressable style={styles.submitButton} onPress={handleSaveMovement} disabled={loadingSubmit}>
                        {loadingSubmit ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Guardar</Text>}
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    scrollContainer: { padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    mainTitle: { fontSize: 28, fontWeight: '900', marginBottom: 20 },
    formCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20, elevation: 3 },
    label: { fontWeight: '700', marginTop: 15, marginBottom: 5 },
    pickerWrapper: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, backgroundColor: '#fff' },
    pickerDisabled: { backgroundColor: '#f1f5f9' },
    input: { height: 50, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, paddingHorizontal: 15 },
    submitButton: { backgroundColor: '#2563eb', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 25 },
    submitButtonText: { color: '#fff', fontWeight: 'bold' },
    errorText: { color: '#dc2626', fontSize: 13, fontWeight: '600' }
});