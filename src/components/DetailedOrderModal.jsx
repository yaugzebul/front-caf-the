import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
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

    const formatQuantity = (item) => {
        if (item.type_vente === 'vrac') {
            return `${item.quantite_commandee} g`;
        } else if (item.type_vente === 'unitaire') {
            return `${item.quantite_commandee} unité(s)`;
        }
        
        if (item.quantite_commandee >= 50) {
            return `${item.quantite_commandee} g`;
        }
        return `x${item.quantite_commandee}`;
    };

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
                    <div className="header-left">
                        <h3>Commande #{order?.id_commande}</h3>
                        {order && (
                            <span className={`status-badge ${order.statut_commande ? order.statut_commande.toLowerCase().replace(' ', '-') : 'inconnu'}`}>
                                {order.statut_commande || 'Statut inconnu'}
                            </span>
                        )}
                    </div>
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
                            {/* Grille d'informations clés */}
                            <div className="info-grid">
                                <div className="info-card">
                                    <span className="info-label">Date de commande</span>
                                    <span className="info-value">{order.date_commande ? new Date(order.date_commande).toLocaleDateString() : 'Inconnue'}</span>
                                </div>
                                <div className="info-card">
                                    <span className="info-label">Mode de commande</span>
                                    <span className="info-value">{order.mode_commande || 'Web'}</span>
                                </div>
                                <div className="info-card">
                                    <span className="info-label">Moyen de paiement</span>
                                    <span className="info-value">{order.moyen_paiement || 'Non spécifié'}</span>
                                </div>
                                <div className="info-card">
                                    <span className="info-label">Date de paiement</span>
                                    <span className="info-value">{order.date_paiement ? new Date(order.date_paiement).toLocaleDateString() : 'En attente'}</span>
                                </div>
                            </div>

                            {/* Liste des articles */}
                            <div className="order-section">
                                <h4 className="section-title">Articles commandés</h4>
                                <table className="articles-table">
                                    <thead>
                                        <tr>
                                            <th style={{width: '50%'}}>Produit</th>
                                            <th style={{textAlign: 'right'}}>Quantité</th>
                                            <th style={{textAlign: 'right'}}>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items && order.items.length > 0 ? (
                                            order.items.map((item, index) => {
                                                const itemPrice = calculateItemPrice(item);
                                                return (
                                                    <tr key={index}>
                                                        <td data-label="Produit">
                                                            <span className="article-name">{item.nom_produit}</span>
                                                        </td>
                                                        <td data-label="Quantité" style={{textAlign: 'right'}}>
                                                            <span className="article-quantity">{formatQuantity(item)}</span>
                                                        </td>
                                                        <td data-label="Total" style={{textAlign: 'right'}}>
                                                            <span className="article-price">{itemPrice ? `${itemPrice} €` : '-'}</span>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr><td colSpan="3">Aucun article trouvé.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Total Général */}
                            <div className="order-total-summary">
                                <div className="total-row">
                                    <span className="total-label">Total TTC</span>
                                    <span className="total-amount">{order.montant_paiement} €</span>
                                </div>
                            </div>
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
