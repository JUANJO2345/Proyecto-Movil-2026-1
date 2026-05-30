var BASE_URL = 'http://10.213.247.235:8000/api'; // Cambia esto por la URL de tu API Laravel

// --- OPERACIONES DE AUTENTICACIÓN ---
function getMe(token) {
    return fetch(BASE_URL + '/me', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) {
        return response.json();
    });
}

function login(email, password) {
    return fetch(BASE_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(function (response) {
        return response.json().then(function (data) {
            if (!response.ok) {
                // Si Laravel devuelve error (401, 403, 422), mandamos los datos para atraparlos en la vista
                var error = new Error('Auth Error');
                error.responseData = data;
                throw error;
            }
            return data;
        });
    });
}

function register(name, email, password) {
    return fetch(BASE_URL + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, password: password })
    })
    .then(function (response) {
        return response.json().then(function (data) {
            if (!response.ok) {
                var error = new Error('Register Error');
                error.responseData = data;
                throw error;
            }
            return data;
        });
    });
}

// --- OPERACIONES DE PRODUCTOS (Las que ya tenías) ---

function getProducts(token) {
    return fetch(BASE_URL + '/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) { return response.json(); });
}

function postProduct(product, token) {
    return fetch(BASE_URL + '/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(product)
    }).then(function (response) { return response.json(); });
}

function updateProduct(id, data, token) {
    return fetch(BASE_URL + '/products/' + id, {
        method: 'PUT', // Usamos PUT como estándar REST
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    });
}

function deleteProduct(id, token) {
    return fetch(BASE_URL + '/products/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(function (response) { return response.json(); });
}
function getInventories(token) {
    return fetch(BASE_URL + '/inventories', { // Tu endpoint global de inventarios
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Error al obtener el catálogo de inventarios');
        }
        return response.json();
    });
    // En src/services/api.js

}
function storeMovement(token, movementData) {
    return fetch(BASE_URL + '/movements', { // Asegúrate de que tu ruta en Laravel sea /api/movements
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(movementData)
    })
    .then(function (response) {
        return response.json().then(function (data) {
            if (!response.ok) {
                var error = new Error('Movement Error');
                error.responseData = data;
                throw error;
            }
            return data;
        });
    });
}
module.exports = {
    login: login,
    register: register,
    getProducts: getProducts,
    postProduct: postProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct,
    getInventories: getInventories,
    getMe: getMe,
    storeMovement: storeMovement
};