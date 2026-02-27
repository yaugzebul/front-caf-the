import React, { useState } from 'react';
import './styles/ProductFilters.css';

const ProductFilters = ({ categories, filters, onFilterChange, priceRange }) => {
    const [isPriceFilterActive, setIsPriceFilterActive] = useState(filters.maxPrice < 9999);

    const handleFilter = (e) => {
        onFilterChange(e.target.name, e.target.value);
    };

    const handlePriceActivation = (e) => {
        const isActive = e.target.checked;
        setIsPriceFilterActive(isActive);
        
        if (!isActive) {
            onFilterChange('maxPrice', 9999);
        } else {
            onFilterChange('maxPrice', priceRange.max);
        }
    };

    return (
        <div className="product-filters">
            {/* Champ de recherche */}
            <div className="filter-group search-group">
                <label htmlFor="search-input">Rechercher</label>
                <input
                    type="text"
                    id="search-input"
                    name="search"
                    placeholder="Nom du produit..."
                    value={filters.search}
                    onChange={handleFilter}
                />
            </div>

            {/* Filtre par catégorie */}
            <div className="filter-group">
                <label htmlFor="category-select">Catégorie</label>
                <select 
                    id="category-select" 
                    name="category" 
                    value={filters.category} 
                    onChange={handleFilter}
                >
                    <option value="all">Toutes</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Filtre par prix */}
            <div className="filter-group price-filter-group">
                <div className="price-header">
                    <input 
                        type="checkbox" 
                        id="price-active" 
                        checked={isPriceFilterActive} 
                        onChange={handlePriceActivation}
                    />
                    <label htmlFor="price-active" className="price-label">
                        Filtrer par prix
                    </label>
                </div>
                
                <div className={`slider-container ${!isPriceFilterActive ? 'disabled' : ''}`}>
                    <label htmlFor="price-slider">
                        {isPriceFilterActive ? `Jusqu'à ${filters.maxPrice} €` : 'Tous les prix'}
                    </label>
                    <input
                        type="range"
                        id="price-slider"
                        name="maxPrice"
                        min={priceRange.min}
                        max={priceRange.max}
                        value={filters.maxPrice}
                        onChange={handleFilter}
                        className="price-slider"
                        disabled={!isPriceFilterActive}
                    />
                </div>
            </div>

            {/* Contrôle de tri */}
            <div className="filter-group">
                <label htmlFor="sort-order">Trier par</label>
                <select 
                    id="sort-order" 
                    name="sort" 
                    value={filters.sort} 
                    onChange={handleFilter}
                >
                    <option value="default">Pertinence</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                </select>
            </div>
        </div>
    );
};

export default ProductFilters;
