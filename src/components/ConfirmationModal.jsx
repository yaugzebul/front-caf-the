import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom'; // 1. Importer useNavigate
import { CheckCircle } from 'lucide-react';
import './styles/ConfirmationModal.css';

const ConfirmationModal = ({ product, quantity, onClose }) => {
    const navigate = useNavigate(); // 2. Initialiser le hook



    const handleGoToCart = () => {
        onClose(); // Ferme la modale avant de naviguer
        navigate('/panier');
    };

    const modalContent = (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <CheckCircle color="#1B3022" size={24} />
                    <span>Ajouté au panier !</span>
                </div>
                <div className="modal-body">
                    <img 
                        src={product.image_url ? `${import.meta.env.VITE_API_URL}/images/${product.image_url}` : `https://placehold.co/100x100/EEE/31343C?text=${encodeURIComponent(product.nom_produit)}`} 
                        alt={product.nom_produit} 
                        className="modal-product-img" 
                    />
                    <div className="modal-product-details">
                        <p className="modal-product-name">{product.nom_produit}</p>
                        <p className="modal-product-quantity">
                            Quantité : {quantity} {product.type_vente === 'vrac' ? 'g' : ''}
                        </p>
                    </div>
                </div>
                {/* 3. Ajouter les boutons d'action */}
                <div className="modal-actions">
                    <button onClick={onClose} className="btn-secondary">
                        Continuer mes achats
                    </button>
                    <button onClick={handleGoToCart} className="btn-primary">
                        Voir mon panier
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

export default ConfirmationModal;
