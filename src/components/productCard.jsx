import React from 'react';
import { Link } from "react-router-dom";
import './styles/productCard.css';

const ProductCard = ({ produit, viewMode = 'grid' }) => { // viewMode par défaut à 'grid'

    const hasImage = produit.image_url && produit.image_url.trim() !== '' && produit.image_url !== 'null';
    const imageURL = hasImage
        ? `${import.meta.env.VITE_API_URL}/images/${produit.image_url}`
        : "https://placehold.co/600x400";

    // Tronquer la description pour l'affichage en liste
    const shortDescription = produit.description ? produit.description.substring(0, 100) + '...' : '';

    return (
        <div className={`product-card ${viewMode}`}>
            <Link to={`/produit/${produit.id_article}`} className="product-card-link">
                <img
                    src={imageURL}
                    alt={produit.nom_produit}
                    className="product-card-img"
                />
            </Link>
            <div className="product-card-content">
                <h3>
                    <Link to={`/produit/${produit.id_article}`}>{produit.nom_produit}</Link>
                </h3>
                
                {viewMode === 'list' && (
                    <p className="product-card-description">{shortDescription}</p>
                )}

                <div className="product-card-footer">
                    <p className="product-card-price">{produit.prix_ttc} €</p>
                    <Link to={`/produit/${produit.id_article}`} className="details-btn">
                        Voir détails
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
