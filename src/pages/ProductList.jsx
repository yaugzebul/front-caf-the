import React, { useEffect, useState, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/productCard.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import './styles/ProductList.css';

const ProductList = () => {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    
    const [filters, setFilters] = useState({
        category: 'all',
        maxPrice: 9999,
    });

    const { token, isAuthLoading } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthLoading) return;

        const fetchProduits = async () => {
            if (!token) {
                setIsLoading(false);
                setError("Vous devez être connecté pour voir les produits.");
                return;
            }
            
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`, { headers: { 'Authorization': `Bearer ${token}` } });
                if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
                const data = await response.json();
                setProduits(data.articles);
                
                const maxPriceFromData = data.articles.reduce((max, p) => {
                    const price = parseFloat(p.prix_ttc);
                    return !isNaN(price) && price > max ? price : max;
                }, 0);
                setFilters(prev => ({ ...prev, maxPrice: maxPriceFromData }));

            } catch (err) {
                setError("Impossible de charger les produits.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduits();
    }, [token, isAuthLoading]);

    // Correction de la logique pour accepter les prix en chaîne de caractères
    const { uniqueCategories, priceRange } = useMemo(() => {
        const categories = [...new Set(produits.map(p => p.categorie).filter(Boolean))];
        
        const prices = produits.map(p => parseFloat(p.prix_ttc)).filter(p => !isNaN(p));

        return {
            uniqueCategories: categories,
            priceRange: {
                min: prices.length > 0 ? Math.min(...prices) : 0,
                max: prices.length > 0 ? Math.max(...prices) : 0,
            }
        };
    }, [produits]);

    const filteredProduits = useMemo(() => {
        return produits.filter(produit => {
            const categoryMatch = filters.category === 'all' || (produit.categorie && produit.categorie.toLowerCase() === filters.category.toLowerCase());
            
            const price = parseFloat(produit.prix_ttc);
            const priceMatch = !isNaN(price) && price <= filters.maxPrice;
            
            return categoryMatch && priceMatch;
        });
    }, [produits, filters]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
    };

    if (isLoading || isAuthLoading) { return <div>Chargement...</div> }
    if (error) { return <div>{error}</div> }

    return (
        <div className="product-list-container">
            <ProductFilters 
                categories={uniqueCategories}
                filters={filters}
                onFilterChange={handleFilterChange}
                priceRange={priceRange}
            />
            <div className="view-controls">
                <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''}>Grille</button>
                <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''}>Liste</button>
            </div>
            <div className={`product-list ${viewMode}`}>
                {filteredProduits.length > 0 ? (
                    filteredProduits.map((produit) => (
                        <ProductCard key={produit.id_article} produit={produit} viewMode={viewMode} />
                    ))
                ) : (
                    <p>Aucun produit ne correspond à vos critères de recherche.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
