import React from 'react';
import './styles/ProductFilters.css';

const ProductFilters = ({ categories, filters, onFilterChange, priceRange }) => {
    
    const handleFilter = (e) => {
        onFilterChange(e.target.name, e.target.value);
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

            {/* Filtre par prix */}
            <div className="filter-group">
                <label htmlFor="price-slider">Prix max : {filters.maxPrice} €</label>
                <input
                    type="range"
                    id="price-slider"
                    name="maxPrice"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.maxPrice}
                    onChange={handleFilter}
                    className="price-slider"
                />
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
