import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useCart } from "../context/CartContext.jsx";
import "./styles/ProductDetail.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
                );

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                setProduit(data.article);

                if (data.article.type_vente === 'vrac') {
                    setQuantity(100);
                } else {
                    setQuantity(1);
                }

            } catch (err) {
                console.error("Erreur lors du chargement du produit :", err);
                setError("Impossible de charger le produit");
            } finally {
                setIsLoading(false);
            }
        };

        void fetchProduit();
    }, [id]);

    const handleIncrement = () => {
        if (produit.type_vente === 'vrac') {
            setQuantity(prev => prev + 100);
        } else {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (produit.type_vente === 'vrac') {
            setQuantity(prev => (prev > 100 ? prev - 100 : 100));
        } else {
            setQuantity(prev => (prev > 1 ? prev - 1 : 1));
        }
    };

    const handleAddToCart = () => {
        addToCart(produit, quantity);
        setShowConfirmation(true);
    };

    if (isLoading) {
        return (
            <div className="product-details-skeleton">
                <Skeleton height={400} width={400} />
                <div style={{ marginTop: 20, flex: 1 }}>
                    <Skeleton height={30} width="50%" />
                    <div style={{ marginTop: 20 }}>
                        <Skeleton count={3} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <Skeleton height={40} width="30%" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-error">
                <div className="error-container">
                    <h3> Une erreur est survenue</h3>
                    <p>{error}</p>
                    <Link to="/produits" className="back-link">
                        Retour aux produits
                    </Link>
                </div>
            </div>
        );
    }

    const imageUrl = produit.image_url
        ? `${import.meta.env.VITE_API_URL}/images/${produit.image_url}`
        : `https://placehold.co/300x300?text=${produit.nom_produit}`;

    const isPromo = produit.promotion && produit.pourcentage_promo > 0;
    const originalPrice = parseFloat(produit.prix_ttc);
    const discountedPrice = isPromo ? originalPrice * (1 - produit.pourcentage_promo / 100) : originalPrice;

    return (
        <>
            <div className="product-details">
                <div className="product-image-container">
                    <img src={imageUrl} alt={produit.nom_produit} />
                </div>
                <div className="product-info">
                    <h2>{produit.nom_produit}</h2>
                    <p className="description">{produit.description}</p>
                    
                    <div className="price-container">
                        {isPromo ? (
                            <>
                                <span className="original-price">
                                    {originalPrice.toFixed(2)} €
                                </span>
                                <span className="discounted-price">
                                    {discountedPrice.toFixed(2)} €
                                </span>
                                <span className="promo-badge">
                                    -{produit.pourcentage_promo}%
                                </span>
                            </>
                        ) : (
                            <span className="price">
                                {originalPrice.toFixed(2)} €
                            </span>
                        )}
                        {produit.type_vente === 'vrac' && <span style={{fontSize: '0.6em', color: '#666', marginLeft: '5px'}}> / kg</span>}
                    </div>

                    <p>
                        <strong>Stock :</strong> {produit.quantite_stock > 0 ? `${produit.quantite_stock} ${produit.type_vente === 'vrac' ? 'g' : 'unités'} disponibles` : <span style={{color: 'red'}}>Rupture de stock</span>}
                    </p>

                    {produit.quantite_stock > 0 && (
                        <div className="add-to-cart-section">
                            <div className="quantity-selector">
                                <button onClick={handleDecrement}>-</button>
                                <span>
                                    {quantity} {produit.type_vente === 'vrac' ? 'g' : ''}
                                </span>
                                <button onClick={handleIncrement}>+</button>
                            </div>
                            <button onClick={handleAddToCart} className="add-to-cart-btn">
                                Ajouter au panier
                            </button>
                        </div>
                    )}

                    <div>
                        <Link to="/produits" className="back-link">
                            ← Retour aux produits
                        </Link>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div className="confirmation-modal-overlay">
                    <div className="confirmation-modal">
                        <h3>Produit ajouté au panier !</h3>
                        <div className="confirmation-product">
                            <img src={imageUrl} alt={produit.nom_produit} />
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

export default ProductDetails;
