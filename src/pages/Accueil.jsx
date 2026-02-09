import React from 'react';
import Hero from '../components/Hero.jsx';
import ProductList from "./ProductList.jsx"; // 1. Importer le composant Hero

function Accueil() {
    return (
        <div>
            {/* 2. Utiliser le composant Hero */}
            <Hero />

            {/* Vous pourrez ajouter d'autres sections ici plus tard */}
        </div>
    );
}

export default Accueil;
