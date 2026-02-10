import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './styles/Panier.css';

const Panier = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, clearCart, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="panier-container empty-cart">
                <h2>Votre panier est vide</h2>
                <p>Parcourez nos sélections pour trouver votre bonheur.</p>
                <Link to="/produits" className="btn-primary">Découvrir nos produits</Link>
            </div>
        );
    }

    return (
        <div className="panier-container">
            <h2>Votre Panier</h2>
            
            {/* En-tête de la liste d'articles */}
            <div className="panier-header">
                <div className="header-product">Produit</div>
                <div className="header-quantity">Quantité</div>
                <div className="header-total">Total</div>
            </div>

            <ul className="panier-items">
                {cartItems.map(item => {
                    const originalUnitPrice = parseFloat(item.prix_ttc);
                    const isPromo = !!(item.promotion && item.pourcentage_promo > 0);
                    
                    const effectiveUnitPrice = isPromo
                        ? (originalUnitPrice * (1 - item.pourcentage_promo / 100))
                        : originalUnitPrice;

                    const lineTotal = item.type_vente === 'vrac'
                        ? (effectiveUnitPrice / 1000) * item.quantity
                        : effectiveUnitPrice * item.quantity;

                    return (
                        <li key={item.id_article} className="panier-item">
                            <div className="item-product">
                                <img 
                                    src={`${import.meta.env.VITE_API_URL}/images/${item.image_url}`} 
                                    alt={item.nom_produit} 
                                    className="panier-item-img"
                                />
                                <div className="item-details">
                                    <span className="item-name">{item.nom_produit}</span>
                                    <span className="item-unit-price">
                                        {isPromo && <span className="price-old">{originalUnitPrice.toFixed(2)} €</span>}
                                        <span className={isPromo ? "price-new" : ""}>
                                            {effectiveUnitPrice.toFixed(2)} € {item.type_vente === 'vrac' ? '/ kg' : '/ unité'}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            
                            <div className="item-quantity">
                                <div className="quantity-control">
                                    <button onClick={() => decreaseQuantity(item.id_article)}>-</button>
                                    <span>
                                        {item.quantity} {item.type_vente === 'vrac' ? 'g' : ''}
                                    </span>
                                    <button onClick={() => increaseQuantity(item.id_article)}>+</button>
                                </div>
                            </div>

                            <div className="item-total">
                                <span className="item-line-total">{lineTotal.toFixed(2)} €</span>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className="panier-summary">
                <div className="panier-total">
                    <span>Total</span>
                    <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="panier-actions">
                    <button onClick={clearCart} className="btn-secondary">Vider le panier</button>
                    <Link to="/checkout" className="btn-primary">Passer la commande</Link>
                </div>
            </div>
        </div>
    );
};

export default Panier;
