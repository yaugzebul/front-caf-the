import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { formatDisplayQuantity } from '../utils/formatUtils';
// Imports optimisés
import X from 'lucide-react/dist/esm/icons/x';
import Package from 'lucide-react/dist/esm/icons/package';
import CreditCard from 'lucide-react/dist/esm/icons/credit-card';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign';
import Truck from 'lucide-react/dist/esm/icons/truck';

import './styles/DetailedOrderModal.css';

const DetailedOrderModal = ({ orderId, onClose }) => {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Impossible de récupérer les détails de la commande');
                }

                const data = await response.json();
                setOrder(data.order);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    if (!orderId) return null;

    const calculateItemPrice = (item) => {
        const prix = parseFloat(item.prix_ttc || item.prix_unitaire || item.prix);
        const quantite = parseFloat(item.quantite_commandee);
        
        if (isNaN(prix) || isNaN(quantite)) return null;

        if (item.type_vente === 'vrac' || quantite >= 50) {
            return (prix * (quantite / 1000)).toFixed(2);
        }
        
        return (prix * quantite).toFixed(2);
    };

    const modalContent = (
        <div className="modal-overlay" onClick={onClose}>
            <div className="order-modal" onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-header">
                    <h3>Commande #{order?.id_commande}</h3>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    {isLoading ? (
                        <div className="loading-state">Chargement...</div>
                    ) : error ? (
                        <div className="error-state">{error}</div>
                    ) : order ? (
                        <>
                            {/* ... (le reste du composant) ... */}
                            <div className="order-section">
                                <h4 className="section-title"><Package size={20} /> Articles</h4>
                                <div className="articles-list">
                                    {order.items && order.items.length > 0 ? (
                                        order.items.map((item, index) => {
                                            console.log("Item data in modal:", item); // Ligne de débogage
                                            const itemPrice = calculateItemPrice(item);
                                            return (
                                                <div key={index} className="article-item">
                                                    <div className="article-info">
                                                        <span className="article-name">{item.nom_produit}</span>
                                                    </div>
                                                    <div className="article-details">
                                                        <span className="article-quantity">{formatDisplayQuantity(item.quantite_commandee, item.type_vente)}</span>
                                                        {itemPrice && <span className="article-price">{itemPrice} €</span>}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p>Aucun article trouvé.</p>
                                    )}
                                </div>
                            </div>
                            {/* ... (le reste du composant) ... */}
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById('modal-root')
    );
};

export default DetailedOrderModal;
