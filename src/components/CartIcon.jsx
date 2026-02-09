import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './styles/CartIcon.css'; // Chemin mis à jour

const CartIcon = () => {
    const { itemCount } = useCart();

    return (
        <Link to="/panier" className="cart-icon-container">
            <span className="cart-icon">🛒</span>
            {itemCount > 0 && (
                <span className="cart-item-count">{itemCount}</span>
            )}
        </Link>
    );
};

export default CartIcon;
