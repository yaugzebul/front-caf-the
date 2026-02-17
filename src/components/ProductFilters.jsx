import React, { useState, useEffect } from 'react';
import './styles/ProductFilters.css';

const ProductFilters = ({ categories, filters, onFilterChange, priceRange }) => {
    // État local pour savoir si le filtre de prix est activé par l'utilisateur
    // On l'initialise à true si le prix max actuel est différent de la valeur par défaut (9999)
    const [isPriceFilterActive, setIsPriceFilterActive] = useState(filters.maxPrice < 9999);

    const handleFilter = (e) => {
        onFilterChange(e.target.name, e.target.value);
    };

    const handlePriceActivation = (e) => {
        const isActive = e.target.checked;
        setIsPriceFilterActive(isActive);
        
        if (!isActive) {
            // Si on désactive, on remet le prix max à 9999 (ou infini) pour tout afficher
            onFilterChange('maxPrice', 9999);
        } else {
            // Si on active, on met le prix max à la valeur max réelle de la gamme
            onFilterChange('maxPrice', priceRange.max);
        }
    };

    return (
        <div className="product-filters">
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

            {/* Filtre par prix amélioré */}
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
