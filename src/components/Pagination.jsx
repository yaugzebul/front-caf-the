import React from 'react';
import './styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) {
        return null; // Ne rien afficher s'il n'y a qu'une seule page
    }

    return (
        <nav className="pagination-container">
            <ul className="pagination-list">
                {/* Bouton Précédent */}
                <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &laquo;
                    </button>
                </li>

                {/* Numéros de page */}
                {pageNumbers.map(number => (
                    <li key={number} className={`pagination-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number)}>
                            {number}
                        </button>
                    </li>
                ))}

                {/* Bouton Suivant */}
                <li className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
