import React, { useState, useEffect } from 'react';
import ProductCard from './productCard.jsx';
import Skeleton from 'react-loading-skeleton';
import { fetchProducts } from '../services/api.js'; // Importer la fonction d'API
import './styles/PromoSection.css';

const PromoSection = () => {
    const [promoProducts, setPromoProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                const data = await fetchProducts();
                const filteredPromos = data.articles.filter(p => p.promotion === 1);
                setPromoProducts(filteredPromos);
            } catch (err) {
                setError(err.message);
                console.error("Erreur lors du chargement des produits pour la section promo :", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
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
                            <ProductCard key={index} isLoading={true} />
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
