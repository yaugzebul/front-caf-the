import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/productCard.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import Pagination from "../components/Pagination.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { useDebounce } from "../hooks/useDebounce.js";
import { fetchProducts } from "../services/api.js"; // Importer la fonction d'API
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

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filters = {
        category: searchParams.get('category') || 'all',
        minPrice: Number(searchParams.get('minPrice')) || 0,
        maxPrice: Number(searchParams.get('maxPrice')) || 9999,
        sort: searchParams.get('sort') || 'default',
        search: debouncedSearchTerm,
        page: Number(searchParams.get('page')) || 1,
    };

    useEffect(() => {
        const newParams = new URLSearchParams(location.search);
        if (debouncedSearchTerm) {
            newParams.set('search', debouncedSearchTerm);
        } else {
            newParams.delete('search');
        }
        newParams.set('page', '1');
        navigate(`?${newParams.toString()}`, { replace: true });
    }, [debouncedSearchTerm]);

    const urlCategoryMap = useMemo(() => ({
        'cafes': 'Café', 'thes': 'Thé', 'accessoires': 'Accessoire', 'cadeaux': 'Cadeau'
    }), []);

    const pageTitle = useMemo(() => {
        if (filters.search) return `Résultats pour "${filters.search}" - Caf'Thé`;
        if (filters.category !== 'all') {
            const catName = urlCategoryMap[filters.category] || filters.category;
            return `${catName}s - Notre sélection | Caf'Thé`;
        }
        return "Tous nos produits - Caf'Thé";
    }, [filters.search, filters.category, urlCategoryMap]);

    const pageKeywords = useMemo(() => {
        let keywords = "achat café, achat thé, boutique en ligne, bio, vrac";
        if (filters.category === 'cafes') keywords += ", café en grain, café moulu, arabica, robusta";
        if (filters.category === 'thes') keywords += ", thé vert, thé noir, infusion, rooibos, matcha";
        if (filters.category === 'accessoires') keywords += ", théière, cafetière, mug, filtre";
        return keywords;
    }, [filters.category]);

    useDocumentTitle(pageTitle, "Parcourez notre catalogue complet de thés, cafés et accessoires.", pageKeywords);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                const data = await fetchProducts(); // Utiliser la fonction du service
                setProduits(data.articles);
            } catch (err) {
                setError("Impossible de charger les produits.");
            } finally {
                setIsLoading(false);
            }
        };
        loadProducts();
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
        if (filterName === 'search') {
            setSearchTerm(value);
            return;
        }

        const newParams = new URLSearchParams(location.search);
        if (filterName === 'price') {
            newParams.set('minPrice', value.min);
            newParams.set('maxPrice', value.max);
        } else {
            if (value === 'all' || !value) newParams.delete(filterName);
            else newParams.set(filterName, value);
        }
        if (filterName !== 'page') newParams.set('page', '1');
        navigate(`?${newParams.toString()}`);
    };

    const sortedAndFilteredProduits = useMemo(() => {
        let filtered = produits.filter(produit => {
            const categoryMatch = filters.category === 'all' || (produit.id_categorie && produit.id_categorie.toLowerCase() === (urlCategoryMap[filters.category] || filters.category).toLowerCase());
            const priceMatch = parseFloat(produit.prix_ttc) >= filters.minPrice && parseFloat(produit.prix_ttc) <= filters.maxPrice;
            const searchMatch = filters.search ? produit.nom_produit.toLowerCase().includes(filters.search.toLowerCase()) : true;
            return categoryMatch && priceMatch && searchMatch;
        });

        if (filters.sort === 'price-asc') filtered.sort((a, b) => parseFloat(a.prix_ttc) - parseFloat(b.prix_ttc));
        else if (filters.sort === 'price-desc') filtered.sort((a, b) => parseFloat(b.prix_ttc) - parseFloat(a.prix_ttc));

        return filtered;
    }, [produits, filters, urlCategoryMap]);

    const paginatedProduits = useMemo(() => {
        const startIndex = (filters.page - 1) * ITEMS_PER_PAGE;
        return sortedAndFilteredProduits.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filters.page, sortedAndFilteredProduits]);

    const totalPages = Math.ceil(sortedAndFilteredProduits.length / ITEMS_PER_PAGE);

    if (error) return <div>{error}</div>;

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">{pageTitle}</h2>
            <div className="top-controls">
                <ProductFilters 
                    categories={uniqueCategories}
                    filters={{...filters, search: searchTerm}}
                    onFilterChange={handleFilterChange}
                    priceRange={priceRange}
                />
                <div className="view-controls">
                    <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'active' : ''}>Grille</button>
                    <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''}>Liste</button>
                </div>
            </div>
            <div className={`product-list ${viewMode}`}>
                {isLoading ? (
                    Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                        <ProductCard key={index} isLoading={true} viewMode={viewMode} />
                    ))
                ) : paginatedProduits.length > 0 ? (
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
