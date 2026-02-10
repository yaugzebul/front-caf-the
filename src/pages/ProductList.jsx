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
    
    const [filters, setFilters] = useState({
        category: 'all', // La catégorie est maintenant une chaîne de caractères (ex: "Café")
        maxPrice: 9999,
    });

    const location = useLocation();

    // Mapping des catégories de l'URL vers les catégories de la base de données
    const urlCategoryMap = useMemo(() => ({
        'cafes': 'Café',
        'thes': 'Thé',
        'accessoires': 'Accessoire',
        'cadeaux': 'Cadeau' // Assurez-vous que cela correspond à vos données
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
                
                const params = new URLSearchParams(location.search);
                const categoryFromURL = params.get('category'); // ex: "cafes"
                
                // Utilisation du mapping pour obtenir la catégorie réelle
                const initialCategory = categoryFromURL ? urlCategoryMap[categoryFromURL.toLowerCase()] : 'all';

                setFilters({
                    maxPrice: maxPriceFromData,
                    category: initialCategory || 'all' // S'assure que c'est 'all' si non mappé
                });

            } catch (err) {
                setError("Impossible de charger les produits.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduits();
    }, [location.search, urlCategoryMap]); // Ajout de urlCategoryMap aux dépendances

    // Extraire les chaînes de caractères uniques pour les catégories
    const uniqueCategories = useMemo(() => {
        return [...new Set(produits.map(p => p.id_categorie).filter(Boolean))];
    }, [produits]);

    const priceRange = useMemo(() => {
        const prices = produits.map(p => parseFloat(p.prix_ttc)).filter(p => !isNaN(p));
        return {
            min: prices.length > 0 ? Math.min(...prices) : 0,
            max: prices.length > 0 ? Math.max(...prices) : 0,
        };
    }, [produits]);

    // Filtrer par comparaison de chaînes de caractères
    const filteredProduits = useMemo(() => {
        return produits.filter(produit => {
            const categoryMatch = filters.category === 'all' || (produit.id_categorie && produit.id_categorie.toLowerCase() === filters.category.toLowerCase());
            const price = parseFloat(produit.prix_ttc);
            const priceMatch = !isNaN(price) && price <= filters.maxPrice;
            return categoryMatch && priceMatch;
        });
    }, [produits, filters]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
    };

    if (isLoading) { return <div>Chargement...</div> }
    if (error) { return <div>{error}</div> }

    return (
        <div className="product-list-container">
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
