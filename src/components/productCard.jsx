import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import './styles/productCard.css';

const ProductCard = ({ produit, viewMode = 'grid' }) => {
    const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
    const navigate = useNavigate();
    const itemInCart = cartItems.find(item => item.id_article === produit.id_article);

    const weightOptions = produit.choix_poids ? produit.choix_poids.split(',').map(Number).sort((a, b) => a - b) : [];
    
    const [selectedWeight, setSelectedWeight] = useState(weightOptions[0] || 0);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const hasImage = produit.image_url && produit.image_url.trim() !== '' && produit.image_url !== 'null';
    const imageURL = hasImage 
        ? `${import.meta.env.VITE_API_URL}/images/${produit.image_url}` 
        : `https://placehold.co/600x400/EEE/31343C?text=${encodeURIComponent(produit.nom_produit)}`;

    const shortDescription = produit.description ? produit.description.substring(0, 100) + '...' : '';
    const isPromo = !!(produit.promotion && produit.pourcentage_promo > 0);
    
    const prixFinal = isPromo
        ? (parseFloat(produit.prix_ttc) * (1 - produit.pourcentage_promo / 100))
        : parseFloat(produit.prix_ttc);

    const displayPrice = `${prixFinal.toFixed(2)} € ${produit.type_vente === 'vrac' ? '/ kg' : '/ unité'}`;

    const handleWeightChange = (e) => {
        setSelectedWeight(Number(e.target.value));
    };

    const handleAddToCart = () => {
        const quantityToAdd = produit.type_vente === 'vrac' ? selectedWeight : 1;
        if (quantityToAdd > 0) {
            addToCart(produit, quantityToAdd);
            setShowConfirmation(true);
        }
    };

    return (
        <>
            <div className={`product-card ${viewMode}`}>
                <Link to={`/produit/${produit.id_article}`} className="product-card-link">
                    <div className="product-card-img-container">
                        <img src={imageURL} alt={produit.nom_produit} className="product-card-img" />
                        {isPromo && <span className="promo-badge">-{produit.pourcentage_promo}%</span>}
                    </div>
                </Link>

                <div className="product-card-content">
                    <h3><Link to={`/produit/${produit.id_article}`}>{produit.nom_produit}</Link></h3>
                    {viewMode === 'list' && <p className="product-card-description">{shortDescription}</p>}
                    
                    <div className="product-card-price-container">
                        {isPromo ? (
                            <>
                                <span className="price-old">{parseFloat(produit.prix_ttc).toFixed(2)} €</span>
                                <span className="price-new">{displayPrice}</span>
                            </>
                        ) : (
                            <p className="product-card-price">{displayPrice}</p>
                        )}
                    </div>

                    <div className="product-card-actions">
                        {produit.type_vente === 'vrac' ? (
                            <div className="vrac-controls">
                                <select 
                                    value={selectedWeight} 
                                    onChange={handleWeightChange} 
                                >
                                    {weightOptions.map(w => <option key={w} value={w}>{w}g</option>)}
                                </select>
                                <button onClick={handleAddToCart} className="add-to-cart-btn">
                                    Ajouter
                                </button>
                            </div>
                        ) : (
                            <>
                                <button onClick={handleAddToCart} className="add-to-cart-btn">
                                    Ajouter au panier
                                </button>
                                {itemInCart && (
                                    <div className="quantity-control">
                                        <button onClick={() => decreaseQuantity(produit.id_article)}>-</button>
                                        <span>{itemInCart.quantity}</span>
                                        <button onClick={() => increaseQuantity(produit.id_article)}>+</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div className="confirmation-modal-overlay">
                    <div className="confirmation-modal">
                        <h3>Produit ajouté au panier !</h3>
                        <div className="confirmation-product">
                            <img src={imageURL} alt={produit.nom_produit} />
                            <span>{produit.nom_produit}</span>
                        </div>
                        <div className="confirmation-actions">
                            <button 
                                onClick={() => setShowConfirmation(false)} 
                                className="btn-secondary"
                            >
                                Continuer mes achats
                            </button>
                            <button 
                                onClick={() => navigate('/panier')} 
                                className="btn-primary"
                            >
                                Voir le panier
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
