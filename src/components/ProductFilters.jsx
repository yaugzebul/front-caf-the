import React from 'react';
import './styles/ProductFilters.css';

const ProductFilters = ({ categories, filters, onFilterChange, priceRange }) => {
    
    const handleCategoryChange = (e) => {
        onFilterChange('category', e.target.value);
    };

    const handlePriceChange = (e) => {
        onFilterChange('maxPrice', Number(e.target.value));
    };

    return (
        <div className="product-filters">
            {/* Filtre par catégorie */}
           /* <div className="filter-group">
                <label htmlFor="category-select">Catégorie</label>
                <select id="category-select" value={filters.category} onChange={handleCategoryChange}>
                    <option value="all">Toutes</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Filtre par prix */}
            <div className="filter-group">
                <label htmlFor="price-slider">Prix maximum : {filters.maxPrice} €</label>
                <input
                    type="range"
                    id="price-slider"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    className="price-slider"
                />
            </div>
        </div>
    );
};

export default ProductFilters;
