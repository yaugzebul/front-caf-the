import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchProductById } from '../services/api.js'; // Importer la fonction d'API
import './styles/Breadcrumbs.css';

const Breadcrumbs = () => {
    const location = useLocation();
    const [productName, setProductName] = useState('');

    const pathnames = location.pathname.split('/').filter(x => x);

    useEffect(() => {
        if (pathnames[0] === 'produit' && pathnames.length > 1) {
            const loadProductName = async () => {
                try {
                    const data = await fetchProductById(pathnames[1]);
                    setProductName(data.article.nom_produit);
                } catch (error) {
                    console.error("Erreur chargement nom produit pour fil d'Ariane:", error);
                }
            };
            loadProductName();
        }
    }, [location.pathname, pathnames]);

    if (pathnames.length === 0) {
        return null;
    }

    const getBreadcrumbName = (name, index) => {
        if (name === 'produit' && index === 0) return 'Produits';
        if (index === 1 && pathnames[0] === 'produit') return productName || '...';
        
        const nameMap = {
            'produits': 'Produits',
            'compte': 'Mon Compte',
            'panier': 'Panier',
            'cgv': 'CGV',
            'politique-confidentialite': 'Politique de Confidentialité',
            'about': 'À Propos',
            'contact': 'Contact',
            'faq': 'FAQ',
            'login': 'Connexion',
            'register': 'Inscription'
        };
        return nameMap[name] || name;
    };

    return (
        <nav className="breadcrumbs-container">
            <Link to="/">Accueil</Link>
            {pathnames.map((value, index) => {
                let to = `/${pathnames.slice(0, index + 1).join('/')}`;
                if (value === 'produit' && index === 0) {
                    to = '/produits';
                }

                const isLast = index === pathnames.length - 1;
                const name = getBreadcrumbName(value, index);

                return isLast ? (
                    <span key={to}> / {name}</span>
                ) : (
                    <span key={to}>
                        {' / '}
                        <Link to={to}>{name}</Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
