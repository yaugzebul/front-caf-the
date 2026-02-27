const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Fonction générique pour gérer les appels fetch et les erreurs.
 * @param {string} url - L'URL de l'API à appeler.
 * @param {object} options - Les options pour fetch (method, headers, body, etc.).
 * @param {boolean} handle401 - Si true, redirige vers /login en cas d'erreur 401.
 * @returns {Promise<any>} - La réponse JSON de l'API.
 * @throws {Error} - Lance une erreur si la réponse n'est pas OK.
 */
const apiFetch = async (url, options = {}, handle401 = true) => {
    // Inclure les cookies pour toutes les requêtes
    options.credentials = 'include';

    const response = await fetch(`${BASE_URL}${url}`, options);

    // Gestion spécifique de l'erreur 401 (Non autorisé / Session expirée)
    if (response.status === 401 && handle401) {
        // On redirige vers la page de connexion si on n'y est pas déjà
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        throw new Error("Session expirée, veuillez vous reconnecter.");
    }

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
// Pour checkUserSession, on ne veut pas rediriger si 401 (visiteur non connecté)
export const checkUserSession = () => apiFetch('/api/clients/me', {}, false);

// Pour loginUser, on ne veut pas rediriger si 401 (mauvais mot de passe)
export const loginUser = (email, mot_de_passe) => apiFetch('/api/clients/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, mot_de_passe }),
}, false);

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
