import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { postProduct, updateProduct, deleteProduct } from '../../services/api';

export default function ProductDetailScreen({ route, navigation }) {
    var { userToken } = useContext(AuthContext);
    var item = route.params?.product; // Si existe, es edición
    var isEditing = !!item;

    var [name, setName] = useState(item?.name || '');
    var [description, setDescription] = useState(item?.description || '');
    var [price, setPrice] = useState(item?.price?.toString() || '');
    var [loading, setLoading] = useState(false);

    function handleSave() {
        if (!name) return Alert.alert('Error', 'El nombre es obligatorio');
        setLoading(true);
        var data = { name, description, price };
        
        var action = isEditing ? updateProduct(item.id, data, userToken) : postProduct(data, userToken);
        
        action.then(() => {
            Alert.alert('Éxito', 'Producto guardado');
            navigation.goBack();
        }).catch(() => Alert.alert('Error', 'No se pudo guardar')).finally(() => setLoading(false));
    }

    function handleDelete() {
        Alert.alert('Eliminar', '¿Seguro?', [
            { text: 'Cancelar' },
            { text: 'Borrar', style: 'destructive', onPress: () => {
                deleteProduct(item.id, userToken).then(() => navigation.goBack());
            }}
        ]);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#fff" /></Pressable>
                <Text style={styles.headerTitle}>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</Text>
                {isEditing ? <Pressable onPress={handleDelete}><Ionicons name="trash" size={24} color="#fff" /></Pressable> : <View style={{width:24}}/>}
            </View>

            <ScrollView style={styles.contentCard}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
                
                <Text style={styles.label}>Precio:</Text>
                <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
                
                <Text style={styles.label}>Descripción:</Text>
                <TextInput style={[styles.input, {height: 80}]} value={description} onChangeText={setDescription} multiline />

                <Pressable style={styles.actionButton} onPress={handleSave} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.actionButtonText}>{isEditing ? 'Guardar Cambios' : 'Crear Producto'}</Text>}
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#1d63ed' },
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    contentCard: { padding: 24 },
    label: { fontSize: 16, color: '#64748b', marginBottom: 5, marginTop: 15 },
    input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, padding: 12, fontSize: 16 },
    actionButton: { backgroundColor: '#1d63ed', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 30 },
    actionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});