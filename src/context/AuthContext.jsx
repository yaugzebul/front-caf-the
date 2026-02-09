import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true); // 1. État de chargement de l'auth

    // Au montage, on restaure la session depuis le localStorage
    useEffect(() => {
        try {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser)); // Correction du bug (JSON.parse)
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Failed to parse auth data from localStorage", error);
        } finally {
            setIsAuthLoading(false); // 2. On signale que l'initialisation est terminée
        }
    }, []);

    // Synchronise le localStorage pour chaque changement
    useEffect(() => {
        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [user, token]);


    const login = (jwt, userData) => {
        setToken(jwt);
        setUser(userData);
    }

    const logout = () => {
        setToken(null);
        setUser(null);
    }

    const value = {
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
        isAuthLoading, // 3. On expose le nouvel état
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
