var BASE_URL = 'http://192.168.1.126:8000/api'; // Cambia esto por la URL de tu API Laravel

// --- OPERACIONES DE AUTENTICACIÓN ---

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

function updateProduct(product, id, token) {
    return fetch(BASE_URL + '/products/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(product)
    }).then(function (response) { return response.json(); });
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

module.exports = {
    login: login,
    register: register,
    getProducts: getProducts,
    postProduct: postProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct
};