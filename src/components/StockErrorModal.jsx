import React from 'react';
import ReactDOM from 'react-dom';
import { AlertTriangle } from 'lucide-react';
import { formatDisplayQuantity } from '../utils/formatUtils';
import './styles/StockErrorModal.css';

const StockErrorModal = ({ product, onClose }) => {
    if (!product) return null;

    const modalContent = (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content stock-error-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <AlertTriangle color="#c0392b" size={24} />
                    <span>Stock insuffisant</span>
                </div>
                <div className="modal-body">
                    <p>
                        Désolé, la quantité demandée pour le produit <strong>{product.nom_produit}</strong> n'est pas disponible.
                    </p>
                    <p>
                        Stock restant : <strong>{formatDisplayQuantity(product.quantite_stock, product.type_vente)}</strong>.
                    </p>
                </div>
                <div className="modal-actions">
                    <button onClick={onClose} className="btn-primary">
                        Compris
                    </button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById('modal-root')
    );
};

export default StockErrorModal;
