import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export var AuthContext = createContext();

export function AuthProvider({ children }) {
    var [userToken, setUserToken] = useState(null);
    var [isLoading, setIsLoading] = useState(true);

    // 🔄 PERSISTENCIA AUTOMÁTICA: Al abrir la app, busca si ya había un token guardado
    useEffect(function () {
        SecureStore.getItemAsync('userToken')
            .then(function (token) {
                if (token) {
                    setUserToken(token);
                }
            })
            .catch(function (err) {
                console.log('Error leyendo el token de persistencia:', err);
            })
            .finally(function () {
                setIsLoading(false);
            });
    }, []);

    // Guarda el token en el almacenamiento físico y actualiza el estado global
    function loginState(token) {
        SecureStore.setItemAsync('userToken', token)
            .then(function () {
                setUserToken(token);
            });
    }

    // Borra el token del almacenamiento físico y limpia el estado (saca al usuario al Login)
    function logoutState() {
        SecureStore.deleteItemAsync('userToken')
            .then(function () {
                setUserToken(null);
            });
    }

    return (
        <AuthContext.Provider value={{ userToken, isLoading, loginState, logoutState }}>
            {children}
        </AuthContext.Provider>
    );
}