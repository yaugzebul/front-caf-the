import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './productCard.jsx';
import { fetchTopSellingProducts } from '../services/api.js'; // Importer la fonction d'API
import './styles/Hero.css';

const Hero = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTopProducts = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTopSellingProducts();
                setTopProducts(data.articles);
            } catch (err) {
                console.error("Erreur lors du chargement des meilleures ventes :", err);
                setError('Impossible de charger les meilleures ventes.');
            } finally {
                setIsLoading(false);
            }
        };

        loadTopProducts();
    }, []);

    return (
        <section className="hero-container">
            <div className="hero-text">
                <h1>Découvrez nos meilleures ventes</h1>
                <p>La sélection de nos clients, pour des saveurs inégalées.</p>
            </div>

            <div className="top-products-list">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <ProductCard key={i} isLoading={true} />
                    ))
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    topProducts.map(product => (
                        <ProductCard 
                            key={product.id_article} 
                            produit={product} 
                            priority={true} 
                        />
                    ))
                )}
            </div>

            <div className="hero-cta-container">
                <Link to="/produits" className="hero-cta-btn">
                    Découvrez notre catalogue de produits !
                </Link>
            </div>
        </section>
    );
};

export default Hero;
