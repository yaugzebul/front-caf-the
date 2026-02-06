import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({ produit }) => {

    const imageURL = produit.image_url ? `${import.meta.env.VITE_API_URL}/images/${produit.image_url}`
        : `https://placehold.co/300x300?text=${produit.nom_produit}`;

    return (
        <div className="product-card">

            <img
                src={imageURL}
                alt={produit.nom_produit}
                className="product-card-img"
            />

            <h3>{produit.nom_produit}</h3>
            <p>{produit.prix_ttc} €</p>

            <Link to={`/produit/${produit.id_article}`} className="details-btn">
                Voir détails
            </Link>
        </div>
    );
};

export default ProductCard;
