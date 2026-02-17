import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './productCard.jsx';
import Skeleton from 'react-loading-skeleton';
import './styles/Hero.css';

const Hero = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/top-selling`);
                
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                
                const data = await response.json();
                setTopProducts(data.articles);
            } catch (err) {
                console.error("Erreur lors du chargement des meilleures ventes :", err);
                setError('Impossible de charger les meilleures ventes.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopProducts();
    }, []);

    return (
        <section className="hero-container">
            <div className="hero-text">
                <h1>Découvrez nos meilleures ventes</h1>
                <p>La sélection de nos clients, pour des saveurs inégalées.</p>
            </div>

            <div className="top-products-list">
                {isLoading ? (
                    <>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="product-skeleton">
                                <Skeleton height={200} width={300} />
                                <Skeleton height={20} width="70%" style={{ marginTop: '1rem' }} />
                                <Skeleton height={20} width="40%" style={{ marginTop: '0.5rem' }} />
                            </div>
                        ))}
                    </>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <>
                        {topProducts.map(product => (
                            <ProductCard key={product.id_article} produit={product} />
                        ))}
                    </>
                )}
            </div>

            {/* Bouton CTA déplacé ici, après la liste des produits */}
            <div className="hero-cta-container">
                <Link to="/produits" className="hero-cta-btn">
                    Découvrez notre catalogue de produits !
                </Link>
            </div>
        </section>
    );
};

export default Hero;
