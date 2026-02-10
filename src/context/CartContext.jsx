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

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id_article === product.id_article);
            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                return prevItems.map(item =>
                    item.id_article === product.id_article ? { ...item, quantity: newQuantity } : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const increaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id_article === productId) {
                    if (item.type_vente === 'unitaire') {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    if (item.type_vente === 'vrac') {
                        const step = 100;
                        return { ...item, quantity: item.quantity + step };
                    }
                }
                return item;
            })
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems(prevItems => {
            const item = prevItems.find(p => p.id_article === productId);
            if (!item) return prevItems;

            if (item.type_vente === 'unitaire') {
                return item.quantity === 1
                    ? prevItems.filter(p => p.id_article !== productId)
                    : prevItems.map(p => p.id_article === productId ? { ...p, quantity: p.quantity - 1 } : p);
            }
            
            if (item.type_vente === 'vrac') {
                const step = 100;
                const newQuantity = item.quantity - step;
                return newQuantity < step
                    ? prevItems.filter(p => p.id_article !== productId)
                    : prevItems.map(p => p.id_article === productId ? { ...p, quantity: newQuantity } : p);
            }
            return prevItems;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id_article !== productId));
    };

    const clearCart = () => setCartItems([]);

    const itemCount = cartItems.reduce((total, item) => (item.type_vente === 'unitaire' ? total + item.quantity : total + 1), 0);

    const { cartTotal, cartTotalWithoutPromo, hasPromo } = cartItems.reduce((totals, item) => {
        const originalPrice = parseFloat(item.prix_ttc);
        if (isNaN(originalPrice)) return totals;

        const isPromo = !!(item.promotion && item.pourcentage_promo > 0);
        const effectivePrice = isPromo ? (originalPrice * (1 - item.pourcentage_promo / 100)) : originalPrice;

        const itemTotal = item.type_vente === 'vrac' ? (effectivePrice / 1000) * item.quantity : effectivePrice * item.quantity;
        const itemTotalWithoutPromo = item.type_vente === 'vrac' ? (originalPrice / 1000) * item.quantity : originalPrice * item.quantity;

        totals.cartTotal += itemTotal;
        totals.cartTotalWithoutPromo += itemTotalWithoutPromo;
        if (isPromo) {
            totals.hasPromo = true;
        }

        return totals;
    }, { cartTotal: 0, cartTotalWithoutPromo: 0, hasPromo: false });


    const value = { 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        increaseQuantity, // On les remet ici
        decreaseQuantity, // On les remet ici
        itemCount, 
        cartTotal,
        cartTotalWithoutPromo,
        hasPromo,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('Le hook useCart doit être utilisé à l\'intérieur du CartProvider');
    return context;
};
