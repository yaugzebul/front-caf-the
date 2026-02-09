import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './styles/Panier.css'; // Chemin mis à jour

const Panier = () => {
    const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="panier-container">
                <h2>Votre panier est vide</h2>
                <Link to="/produits" className="btn-primary">Continuer vos achats</Link>
            </div>
        );
    }

    return (
        <div className="panier-container">
            <h2>Votre Panier</h2>
            <ul className="panier-items">
                {cartItems.map(item => (
                    <li key={item.id_article} className="panier-item">
                        <div className="item-info">
                            <span>{item.nom_produit} (x{item.quantity})</span>
                            <span>{(item.prix_ttc * item.quantity).toFixed(2)} €</span>
                        </div>
                        <button onClick={() => removeFromCart(item.id_article)} className="btn-danger">
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
            <div className="panier-total">
                <h3>Total: {cartTotal.toFixed(2)} €</h3>
            </div>
            <div className="panier-actions">
                <button onClick={clearCart} className="btn-secondary">Vider le panier</button>
                <button className="btn-primary">Passer la commande</button>
            </div>
        </div>
    );
};

export default Panier;
