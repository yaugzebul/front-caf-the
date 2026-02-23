import React from 'react';
import './styles/OrderList.css';

const OrderList = ({ orders, onViewDetails }) => {
    if (!orders || orders.length === 0) {
        return <p className="no-orders">Aucune commande trouvée.</p>;
    }

    return (
        <div className="order-list-container">
            <table className="order-table">
                <thead>
                    <tr>
                        <th className="OrderList-th">N°</th>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id_commande}>
                            <td data-label="N° Commande">#{order.id_commande}</td>
                            <td data-label="Date">{new Date(order.date_commande).toLocaleDateString()}</td>
                            <td data-label="Montant" className="order-amount">{order.montant_paiement} €</td>
                            <td data-label="Statut">
                                <span className={`status-pill ${order.statut_commande ? order.statut_commande.toLowerCase().replace(' ', '-') : 'inconnu'}`}>
                                    {order.statut_commande || 'Inconnu'}
                                </span>
                            </td>
                            <td data-label="Action">
                                <button 
                                    className="btn-details"
                                    onClick={() => onViewDetails(order.id_commande)}
                                >
                                    Détails
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
