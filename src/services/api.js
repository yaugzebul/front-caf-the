const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Fonction générique pour gérer les appels fetch et les erreurs.
 * @param {string} url - L'URL de l'API à appeler.
 * @param {object} options - Les options pour fetch (method, headers, body, etc.).
 * @returns {Promise<any>} - La réponse JSON de l'API.
 * @throws {Error} - Lance une erreur si la réponse n'est pas OK.
 */
const apiFetch = async (url, options = {}) => {
    // Inclure les cookies pour toutes les requêtes
    options.credentials = 'include';

    const response = await fetch(`${BASE_URL}${url}`, options);

    const data = await response.json();

    if (!response.ok) {
        // Utiliser le message d'erreur de l'API s'il existe, sinon un message par défaut
        throw new Error(data.message || `Erreur API : ${response.statusText}`);
    }

    return data;
};

// --- ARTICLES ---
export const fetchProducts = () => apiFetch('/api/articles');
export const fetchProductById = (id) => apiFetch(`/api/articles/${id}`);
export const fetchTopSellingProducts = () => apiFetch('/api/articles/top-selling');

// --- CLIENTS / AUTH ---
export const checkUserSession = () => apiFetch('/api/clients/me');
export const loginUser = (email, mot_de_passe) => apiFetch('/api/clients/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, mot_de_passe }),
});
export const registerUser = (userData) => apiFetch('/api/clients/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
});
export const logoutUser = () => apiFetch('/api/clients/logout', { method: 'POST' });
export const updateUser = (userData) => apiFetch('/api/clients/me', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
});
export const changePassword = (passwordData) => apiFetch('/api/clients/password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(passwordData),
});

// --- COMMANDES ---
export const fetchOrders = () => apiFetch('/api/orders');
export const fetchOrderDetails = (id) => apiFetch(`/api/orders/${id}`);
