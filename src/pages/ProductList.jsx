import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/productCard.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import Pagination from "../components/Pagination.jsx"; // Importer la pagination
import './styles/ProductList.css';

const ITEMS_PER_PAGE = 12; // Nombre de produits par page

const ProductList = () => {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [sortOrder, setSortOrder] = useState('default');
    const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle

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

    const sortedAndFilteredProduits = useMemo(() => {
        let filtered = produits.filter(produit => {
            const categoryMatch = filters.category === 'all' || (produit.id_categorie && produit.id_categorie.toLowerCase() === filters.category.toLowerCase());
            const price = parseFloat(produit.prix_ttc);
            const priceMatch = !isNaN(price) && price <= filters.maxPrice;
            const searchMatch = searchQuery 
                ? produit.nom_produit.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            return categoryMatch && priceMatch && searchMatch;
        });

        if (sortOrder === 'price-asc') {
            filtered.sort((a, b) => parseFloat(a.prix_ttc) - parseFloat(b.prix_ttc));
        } else if (sortOrder === 'price-desc') {
            filtered.sort((a, b) => parseFloat(b.prix_ttc) - parseFloat(a.prix_ttc));
        }

        return filtered;
    }, [produits, filters, searchQuery, sortOrder]);

    // Calculer les produits pour la page actuelle
    const paginatedProduits = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedAndFilteredProduits.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, sortedAndFilteredProduits]);

    const totalPages = Math.ceil(sortedAndFilteredProduits.length / ITEMS_PER_PAGE);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
        setCurrentPage(1); // Revenir à la première page lors d'un changement de filtre
    };
    
    const handleSortChange = (value) => {
        setSortOrder(value);
        setCurrentPage(1); // Revenir à la première page lors d'un changement de tri
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
                        sortOrder={sortOrder}
                        onSortChange={handleSortChange}
                    />
                )}
                <div className="view-controls">
                    <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''}>Grille</button>
                    <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''}>Liste</button>
                </div>
            </div>

            <div className={`product-list ${viewMode}`}>
                {paginatedProduits.length > 0 ? (
                    paginatedProduits.map((produit) => (
                        <ProductCard key={produit.id_article} produit={produit} viewMode={viewMode} />
                    ))
                ) : (
                    <p className="no-products-message">Aucun produit ne correspond à vos critères.</p>
                )}
            </div>

            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default ProductList;
