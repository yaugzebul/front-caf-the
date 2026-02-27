import React, { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Impossible d'analyser les articles du panier", error);
            return [];
        }
    });

    // État pour la modale de confirmation
    const [confirmation, setConfirmation] = useState({
        product: null,
        quantity: 0,
        isVisible: false,
    });

    // État pour la modale d'erreur de stock
    const [stockError, setStockError] = useState({
        product: null,
        isVisible: false,
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity) => {
        const existingItem = cartItems.find(item => item.id_article === product.id_article);
        const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
        const totalQuantity = currentQuantityInCart + quantity;

        // Vérification du stock
        if (totalQuantity > product.quantite_stock) {
            setStockError({ product, isVisible: true });
            return; // Bloque l'ajout
        }

        setCartItems(prevItems => {
            if (existingItem) {
                return prevItems.map(item =>
                    item.id_article === product.id_article ? { ...item, quantity: totalQuantity } : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
        setConfirmation({ product, quantity, isVisible: true });
    };

    const increaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id_article === productId) {
                    const step = item.type_vente === 'vrac' ? 100 : 1;
                    const newQuantity = item.quantity + step;

                    // Vérification du stock
                    if (newQuantity > item.quantite_stock) {
                        setStockError({ product: item, isVisible: true });
                        return item; // Ne pas augmenter la quantité
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems(prevItems => {
            const item = prevItems.find(p => p.id_article === productId);
            if (!item) return prevItems;

            const step = item.type_vente === 'vrac' ? 100 : 1;
            const newQuantity = item.quantity - step;

            if (newQuantity < step) {
                return prevItems.filter(p => p.id_article !== productId);
            }
            return prevItems.map(p => p.id_article === productId ? { ...p, quantity: newQuantity } : p);
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id_article !== productId));
    };

    const clearCart = () => setCartItems([]);

    const closeConfirmation = () => {
        setConfirmation({ product: null, quantity: 0, isVisible: false });
    };

    const closeStockError = () => {
        setStockError({ product: null, isVisible: false });
    };

    const itemCount = cartItems.reduce((total, item) => (item.type_vente === 'unitaire' ? total + item.quantity : total + 1), 0);

    const { cartTotal, cartTotalWithoutPromo, hasPromo } = cartItems.reduce((totals, item) => {
        // ... (logique de calcul du total)
        return totals;
    }, { cartTotal: 0, cartTotalWithoutPromo: 0, hasPromo: false });

    const value = { 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        increaseQuantity,
        decreaseQuantity,
        itemCount, 
        cartTotal,
        cartTotalWithoutPromo,
        hasPromo,
        confirmation,
        closeConfirmation,
        stockError, // Exporter l'état d'erreur
        closeStockError, // Exporter la fonction de fermeture
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('Le hook useCart doit être utilisé à l\'intérieur du CartProvider');
    return context;
};
