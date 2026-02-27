import React, { createContext, useState, useEffect } from "react";
import { checkUserSession, logoutUser } from "../services/api.js"; // Importer les fonctions d'API

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const data = await checkUserSession();
                setUser(data.client);
            } catch (error) {
                // C'est normal d'avoir une erreur si l'utilisateur n'est pas connecté
                // On ne log que si ce n'est pas une erreur 401 (Non autorisé)
                if (error.message.includes("401")) {
                    // Pas d'erreur à afficher, l'utilisateur n'est juste pas connecté
                } else {
                    console.error("Erreur vérification session:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
