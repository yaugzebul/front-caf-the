import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Création du Contexte
export const CartContext = createContext(null);

// 2. Création du Fournisseur (Provider)
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Impossible d'afficher les articles du panier", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id_article === product.id_article);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id_article === product.id_article
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id_article !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.prix_ttc * item.quantity), 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Hook personnalisé pour une utilisation facile
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error(`Le hook useCart doit être utilisé à l'intérieur du CartProvider`);
    }
    return context;
};
