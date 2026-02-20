import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/productCard.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import Pagination from "../components/Pagination.jsx";
import './styles/ProductList.css';

const ITEMS_PER_PAGE = 12;

const ProductList = () => {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const filters = {
        category: searchParams.get('category') || 'all',
        minPrice: Number(searchParams.get('minPrice')) || 0,
        maxPrice: Number(searchParams.get('maxPrice')) || 9999,
        sort: searchParams.get('sort') || 'default',
        search: searchParams.get('search') || '',
        page: Number(searchParams.get('page')) || 1,
    };

    const urlCategoryMap = useMemo(() => ({
        'cafes': 'Café', 'thes': 'Thé', 'accessoires': 'Accessoire', 'cadeaux': 'Cadeau'
    }), []);

    const displayFilters = useMemo(() => {
        const mappedCategory = urlCategoryMap[filters.category];
        return {
            ...filters,
            category: mappedCategory ? mappedCategory.toLowerCase() : filters.category
        };
    }, [filters, urlCategoryMap]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
                const data = await response.json();
                setProduits(data.articles);
            } catch (err) {
                setError("Impossible de charger les produits.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduits();
    }, []);

    const { uniqueCategories, priceRange } = useMemo(() => {
        const categories = [...new Set(produits.map(p => p.id_categorie).filter(Boolean))];
        const prices = produits.map(p => parseFloat(p.prix_ttc)).filter(p => !isNaN(p));
        return {
            uniqueCategories: categories,
            priceRange: { min: prices.length > 0 ? Math.floor(Math.min(...prices)) : 0, max: prices.length > 0 ? Math.ceil(Math.max(...prices)) : 100 }
        };
    }, [produits]);

    const handleFilterChange = (filterName, value) => {
        const newParams = new URLSearchParams(location.search);
        
        if (filterName === 'price') {
            newParams.set('minPrice', value.min);
            newParams.set('maxPrice', value.max);
        } else {
            if (value === 'all' || !value) {
                newParams.delete(filterName);
            } else {
                newParams.set(filterName, value);
            }
        }
        
        // Correction : On ne réinitialise la page à 1 que si on change un filtre AUTRE que la page
        if (filterName !== 'page') {
            newParams.set('page', '1');
        }
        
        navigate(`?${newParams.toString()}`);
    };

    const sortedAndFilteredProduits = useMemo(() => {
        const categoryTarget = urlCategoryMap[filters.category] || filters.category;

        let filtered = produits.filter(produit => {
            const categoryMatch = filters.category === 'all' || 
                (produit.id_categorie && produit.id_categorie.toLowerCase() === categoryTarget.toLowerCase());
            
            const price = parseFloat(produit.prix_ttc);
            const priceMatch = price >= filters.minPrice && price <= filters.maxPrice;
            
            const searchMatch = filters.search 
                ? produit.nom_produit.toLowerCase().includes(filters.search.toLowerCase()) 
                : true;

            return categoryMatch && priceMatch && searchMatch;
        });

        if (filters.sort === 'price-asc') {
            filtered.sort((a, b) => parseFloat(a.prix_ttc) - parseFloat(b.prix_ttc));
        } else if (filters.sort === 'price-desc') {
            filtered.sort((a, b) => parseFloat(b.prix_ttc) - parseFloat(a.prix_ttc));
        }

        return filtered;
    }, [produits, filters, urlCategoryMap]);

    const paginatedProduits = useMemo(() => {
        const startIndex = (filters.page - 1) * ITEMS_PER_PAGE;
        return sortedAndFilteredProduits.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filters.page, sortedAndFilteredProduits]);

    const totalPages = Math.ceil(sortedAndFilteredProduits.length / ITEMS_PER_PAGE);

    if (isLoading) { return <div>Chargement...</div> }
    if (error) { return <div>{error}</div> }

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">
                {filters.search ? `Résultats pour "${filters.search}"` : "Nos Produits"}
            </h2>
            
            <div className="top-controls">
                {produits.length > 0 && (
                    <ProductFilters 
                        categories={uniqueCategories}
                        filters={displayFilters}
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
                {paginatedProduits.length > 0 ? (
                    paginatedProduits.map((produit) => (
                        <ProductCard key={produit.id_article} produit={produit} viewMode={viewMode} />
                    ))
                ) : (
                    <p className="no-products-message">Aucun produit ne correspond à vos critères.</p>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination 
                    currentPage={filters.page}
                    totalPages={totalPages}
                    onPageChange={(page) => handleFilterChange('page', page)}
                />
            )}
        </div>
    );
};

export default ProductList;
