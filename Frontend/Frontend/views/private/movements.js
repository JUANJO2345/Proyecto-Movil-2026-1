import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker'; 
import * as SecureStore from 'expo-secure-store';
import { getProducts, getInventories, storeMovement } from '../../services/api'; 

export default function MovementsScreen({ route }) {
    // --- CATÁLOGOS GLOBALES EN MEMORIA ---
    var [productsList, setProductsList] = useState([]);
    var [globalInventories, setGlobalInventories] = useState([]); // Base de datos completa de almacenes

    // --- ESTADOS DEL FORMULARIO ---
    var [selectedProductId, setSelectedProductId] = useState('');
    var [filteredInventories, setFilteredInventories] = useState([]); // Solo los que coinciden con el producto
    var [selectedInventoryId, setSelectedInventoryId] = useState('');
    var [movementType, setMovementType] = useState('entrada');
    var [quantity, setQuantity] = useState('');

    // --- CONTROL ---
    var [loadingInitial, setLoadingInitial] = useState(true);
    var [loadingSubmit, setLoadingSubmit] = useState(false);
    var [validationErrors, setValidationErrors] = useState([]);

    // 1. DESCARGA EN PARALELO DE AMBOS CATÁLOGOS
    useEffect(function () {
        SecureStore.getItemAsync('userToken').then(function (token) {
            // Ejecuta ambas peticiones HTTP al mismo tiempo
            Promise.all([getProducts(token), getInventories(token)])
                .then(function (results) {
                    var productsData = results[0];
                    var inventoriesData = results[1];

                    setProductsList(productsData || []);
                    setGlobalInventories(inventoriesData || []);
                })
                .catch(function (err) {
                    console.log('Error en la descarga paralela:', err);
                    setValidationErrors(['Error al sincronizar catálogos independientes desde el servidor.']);
                })
                .finally(function () {
                    setLoadingInitial(false);
                });
        });
    }, []);

    // 2. 🔀 TU IDEA: El algoritmo de cruce de llaves en el Frontend
    useEffect(function () {
        if (!selectedProductId) {
            setFilteredInventories([]);
            setSelectedInventoryId('');
            return;
        }

        // Filtramos el catálogo global buscando los inventarios que pertenezcan a este ID de producto
        // NOTA: Revisa si en tu JSON de inventarios la propiedad se llama 'product_id' o 'producto_id'
        var matches = globalInventories.filter(function (inventory) {
            return String(inventory.product_id) === String(selectedProductId);
        });

        setFilteredInventories(matches);

        // Si encontramos coincidencias cruzar, preseleccionamos la primera
        if (matches.length > 0) {
            setSelectedInventoryId(String(matches[0].id));
        } else {
            setSelectedInventoryId('');
        }
    }, [selectedProductId, globalInventories]);

    // 3. Capturar navegación desde "Detalles"
    useEffect(function () {
        var defaultProduct = route.params?.defaultProduct;
        if (defaultProduct && productsList.length > 0) {
            setSelectedProductId(String(defaultProduct.id));
        }
    }, [route.params?.defaultProduct, productsList]);

    // 4. Guardar datos
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

        SecureStore.getItemAsync('userToken')
            .then(function (token) {
                var payload = {
                    product_id: parseInt(selectedProductId, 10),
                    inventory_id: selectedInventoryId ? parseInt(selectedInventoryId, 10) : null,
                    type: movementType,
                    quantity: parseInt(quantity, 10)
                };
                return storeMovement(token, payload);
            })
            .then(function () {
                Alert.alert('Éxito', 'Movimiento registrado mediante cruce local.');
                setSelectedProductId('');
                setQuantity('');
            })
            .catch(function (error) {
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
                <Text style={styles.loadingText}>Descargando bases de datos locales...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                
                <Text style={styles.mainTitle}>Nuevo Movimiento</Text>

                {validationErrors.length > 0 && (
                    <View style={styles.errorBox}>
                        {validationErrors.map(function (err, idx) {
                            return <Text key={idx} style={styles.errorText}>• {err}</Text>;
                        })}
                    </View>
                )}

                <View style={styles.formCard}>
                    
                    {/* PICKER 1: PRODUCTOS */}
                    <Text style={styles.label}>Producto</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={selectedProductId}
                            onValueChange={function (itemValue) { setSelectedProductId(itemValue); }}
                            dropdownIconColor="#1d63ed"
                        >
                            <Picker.Item label="-- Selecciona un producto --" value="" color="#94a3b8" />
                            {productsList.map(function (product) {
                                return (
                                    <Picker.Item key={product.id} label={product.name} value={String(product.id)} />
                                );
                            })}
                        </Picker>
                    </View>

                    {/* PICKER 2: INVENTARIOS CRUIZADOS LOCALMENTE */}
                    <Text style={styles.label}>Inventario / Sucursal (Cruce local)</Text>
                    <View style={[styles.pickerWrapper, !selectedProductId && styles.pickerDisabled]}>
                        <Picker
                            selectedValue={selectedInventoryId}
                            onValueChange={function (itemValue) { setSelectedInventoryId(itemValue); }}
                            disabled={!selectedProductId || filteredInventories.length === 0}
                            dropdownIconColor="#1d63ed"
                        >
                            {!selectedProductId ? (
                                <Picker.Item label="-- Primero selecciona un producto --" value="" color="#94a3b8" />
                            ) : filteredInventories.length === 0 ? (
                                <Picker.Item label="No hay almacenes con este ID de producto" value="" color="#ef4444" />
                            ) : (
                                filteredInventories.map(function (inv) {
                                    return (
                                        <Picker.Item 
                                            key={inv.id} 
                                            label={inv.nombre || inv.name || `Almacén #${inv.id}`} 
                                            value={String(inv.id)} 
                                        />
                                    );
                                })
                            )}
                        </Picker>
                    </View>

                    {/* PICKER 3: TIPO */}
                    <Text style={styles.label}>Tipo</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={movementType}
                            onValueChange={function (itemValue) { setMovementType(itemValue); }}
                            dropdownIconColor="#1d63ed"
                        >
                            <Picker.Item label="Entrada" value="entrada" />
                            <Picker.Item label="Salida" value="salida" />
                        </Picker>
                    </View>

                    {/* INPUT 4: CANTIDAD */}
                    <Text style={styles.label}>Cantidad</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Cantidad"
                        placeholderTextColor="#94a3b8"
                        keyboardType="numeric"
                        value={quantity}
                        onChangeText={setQuantity}
                    />

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
    scrollContainer: { padding: 20, paddingBottom: 40 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
    loadingText: { marginTop: 12, fontSize: 15, color: '#64748b', fontWeight: '500' },
    mainTitle: { fontSize: 32, fontWeight: '900', color: '#0f172a', marginBottom: 20 },
    errorBox: { backgroundColor: '#fee2e2', padding: 16, borderRadius: 16, marginBottom: 20, borderWidth: 1, borderColor: '#fca5a5' },
    errorText: { color: '#dc2626', fontSize: 14, fontWeight: '700', marginVertical: 2 },
    formCard: { backgroundColor: '#fff', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#f1f5f9', elevation: 2 },
    label: { fontSize: 15, fontWeight: '700', color: '#1e293b', marginBottom: 8, marginTop: 14 },
    pickerWrapper: { width: '100%', height: 55, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 16, backgroundColor: '#fff', justifyContent: 'center', overflow: 'hidden', marginBottom: 6 },
    pickerDisabled: { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0' },
    input: { width: '100%', height: 55, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 16, paddingHorizontal: 16, fontSize: 16, color: '#334155', backgroundColor: '#fff', marginBottom: 10 },
    submitButton: { backgroundColor: '#2563eb', width: '100%', height: 55, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
    submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' }
});