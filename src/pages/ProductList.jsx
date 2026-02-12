import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/productCard.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import './styles/ProductList.css';

const ProductList = () => {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    
    const location = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const searchQuery = searchParams.get('search') || '';

    const [filters, setFilters] = useState({
        category: 'all',
        maxPrice: 9999,
    });

    const urlCategoryMap = useMemo(() => ({
        'cafes': 'Café', 'thes': 'Thé', 'accessoires': 'Accessoire', 'cadeaux': 'Cadeau'
    }), []);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
                
                const data = await response.json();
                setProduits(data.articles);
                
                const maxPriceFromData = data.articles.reduce((max, p) => (parseFloat(p.prix_ttc) > max ? parseFloat(p.prix_ttc) : max), 0);
                const categoryFromURL = searchParams.get('category');
                const initialCategory = categoryFromURL ? urlCategoryMap[categoryFromURL.toLowerCase()] : 'all';

                setFilters({ maxPrice: maxPriceFromData, category: initialCategory || 'all' });

            } catch (err) {
                setError("Impossible de charger les produits.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduits();
    }, [location.search, urlCategoryMap, searchParams]);

    const { uniqueCategories, priceRange } = useMemo(() => {
        const categories = [...new Set(produits.map(p => p.id_categorie).filter(Boolean))];
        const prices = produits.map(p => parseFloat(p.prix_ttc)).filter(p => !isNaN(p));
        return {
            uniqueCategories: categories,
            priceRange: { min: prices.length > 0 ? Math.min(...prices) : 0, max: prices.length > 0 ? Math.max(...prices) : 0 }
        };
    }, [produits]);

    const filteredProduits = useMemo(() => {
        return produits.filter(produit => {
            // Filtre par catégorie
            const categoryMatch = filters.category === 'all' || (produit.id_categorie && produit.id_categorie.toLowerCase() === filters.category.toLowerCase());
            
            // Filtre par prix
            const price = parseFloat(produit.prix_ttc);
            const priceMatch = !isNaN(price) && price <= filters.maxPrice;

            // Filtre par recherche textuelle
            const searchMatch = searchQuery 
                ? produit.nom_produit.toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            return categoryMatch && priceMatch && searchMatch;
        });
    }, [produits, filters, searchQuery]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
    };

    if (isLoading) { return <div>Chargement...</div> }
    if (error) { return <div>{error}</div> }

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">
                {searchQuery ? `Résultats pour "${searchQuery}"` : "Nos Produits"}
            </h2>
            <div className="top-controls">
                {produits.length > 0 && (
                    <ProductFilters 
                        categories={uniqueCategories}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        priceRange={priceRange}
                    />
                )}
                <div className="view-controls">
                    <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''}>Grille</button>
                    <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''}>Liste</button>
                </div>
            </div>

            <div className={`product-list ${viewMode}`}>
                {filteredProduits.length > 0 ? (
                    filteredProduits.map((produit) => (
                        <ProductCard key={produit.id_article} produit={produit} viewMode={viewMode} />
                    ))
                ) : (
                    <p className="no-products-message">Aucun produit ne correspond à vos critères.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
