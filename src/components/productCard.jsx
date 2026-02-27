import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';
import { formatDisplayQuantity } from '../utils/formatUtils';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles/productCard.css';

const ProductCard = ({ produit, viewMode = 'grid', priority = false, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className={`product-card ${viewMode}`}>
                <div className="product-card-img-container">
                    <Skeleton height="100%" />
                </div>
                <div className="product-card-content">
                    <h3><Skeleton width="80%" /></h3>
                    <div className="product-card-price-container">
                        <Skeleton width="40%" height={24} />
                    </div>
                    <div className="product-card-actions">
                        <Skeleton height={40} />
                    </div>
                </div>
            </div>
        );
    }

    const { addToCart } = useCart();

    const weightOptions = produit.choix_poids ? produit.choix_poids.split(',').map(Number).sort((a, b) => a - b) : [];
    const [selectedWeight, setSelectedWeight] = useState(weightOptions[0] || 0);
    const [quantity, setQuantity] = useState(1);

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

    const handleAddToCart = () => {
        const quantityToAdd = produit.type_vente === 'vrac' ? selectedWeight : quantity;
        if (quantityToAdd > 0) {
            addToCart(produit, quantityToAdd);
        }
    };

    const selectId = `weight-select-${produit.id_article}`;

    return (
        <div className={`product-card ${viewMode}`}>
            <Link to={`/produit/${produit.id_article}`} className="product-card-link">
                <div className="product-card-img-container">
                    <img 
                        src={imageURL} 
                        alt={produit.nom_produit} 
                        className="product-card-img"
                        loading={priority ? "eager" : "lazy"}
                        fetchPriority={priority ? "high" : "auto"}
                    />
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
                            <label htmlFor={selectId} className="visually-hidden">
                                Choisir la quantité
                            </label>
                            <select 
                                id={selectId}
                                value={selectedWeight} 
                                onChange={(e) => setSelectedWeight(Number(e.target.value))} 
                            >
                                {weightOptions.map(w => (
                                    <option key={w} value={w}>
                                        {formatDisplayQuantity(w, 'vrac')}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleAddToCart} className="add-to-cart-btn">
                                Ajouter
                            </button>
                        </div>
                    ) : (
                        <div className="unitaire-controls">
                            <div className="quantity-control">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                            <button onClick={handleAddToCart} className="add-to-cart-btn">
                                Ajouter au panier
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
