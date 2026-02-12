import React, { useState, useEffect } from 'react';
import ProductCard from './productCard.jsx';
import Skeleton from 'react-loading-skeleton';
import './styles/PromoSection.css';

const PromoSection = () => {
    const [promoProducts, setPromoProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                if (!response.ok) {
                    throw new Error('Impossible de charger les produits.');
                }
                const data = await response.json();

                const filteredPromos = data.articles.filter(p => p.promotion === 1);
                
                setPromoProducts(filteredPromos);

            } catch (err) {
                setError(err.message);
                console.error("Erreur lors du chargement des produits pour la section promo :", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (!isLoading && !error && promoProducts.length === 0) {
        return null;
    }

    return (
        <div className="promo-section-wrapper">
            <div className="promo-section-content">
                <div className="promo-header">
                    <h2 className="promo-title">Découvrez nos articles en promotion</h2>
                    <p className="promo-subtitle">Des produits de qualité à prix réduit, pour une durée limitée.</p>
                </div>
                
                {isLoading && (
                    <div className="promo-grid">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="product-card-skeleton">
                                <Skeleton height={200} />
                                <Skeleton height={30} style={{ marginTop: '1rem' }} />
                                <Skeleton count={2} />
                            </div>
                        ))}
                    </div>
                )}

                {error && <p className="error-message">{error}</p>}

                {!isLoading && !error && (
                    <div className="promo-grid">
                        {promoProducts.map(produit => (
                            <ProductCard key={produit.id_article} produit={produit} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PromoSection;
