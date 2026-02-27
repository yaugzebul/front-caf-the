import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import PasswordChangeModal from '../components/PasswordChangeModal.jsx';
import DetailedOrderModal from '../components/DetailedOrderModal.jsx';
import OrderList from '../components/OrderList.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { fetchOrders, updateUser } from '../services/api.js';
import './styles/Account.css';

const Account = () => {
    const { user, logout, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('infos');
    
    const [orders, setOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [ordersError, setOrdersError] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const tabTitles = {
        infos: "Mes Informations - Mon Compte",
        adresses: "Mes Adresses - Mon Compte",
        historique: "Historique des commandes - Mon Compte",
        suivi: "Suivi de commande - Mon Compte"
    };
    useDocumentTitle(
        tabTitles[activeTab] || "Mon Compte", 
        "Gérez vos informations personnelles, vos adresses et consultez vos commandes sur Caf'Thé.",
        "mon compte, espace client, mes informations, mes commandes, suivi de commande, adresses"
    );

    useEffect(() => {
        if (user) {
            const loadOrders = async () => {
                try {
                    const data = await fetchOrders();
                    setOrders(data.orders || data);
                } catch (err) {
                    console.error(err);
                    setOrdersError('Impossible de charger l\'historique des commandes.');
                } finally {
                    setIsLoadingOrders(false);
                }
            };
            loadOrders();
        }
    }, [user]);

    if (!user) {
        navigate('/login');
        return null;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'infos':
                return <InfosPersonnelles user={user} onUpdateUser={login} />;
            case 'adresses':
                return <Adresses user={user} onUpdateUser={login} />;
            case 'historique':
                return <HistoriqueCommandes 
                            orders={orders} 
                            isLoading={isLoadingOrders} 
                            error={ordersError} 
                            onViewDetails={setSelectedOrderId} 
                        />;
            case 'suivi':
                return <SuiviCommandes 
                            orders={orders} 
                            isLoading={isLoadingOrders} 
                            error={ordersError} 
                            onViewDetails={setSelectedOrderId} 
                        />;
            default:
                return <InfosPersonnelles user={user} onUpdateUser={login} />;
        }
    };

    return (
        <div className="account-container">
            <aside className="account-sidebar">
                <h3>Mon Compte</h3>
                <ul className="account-nav">
                    <li><button className={`account-btn ${activeTab === 'infos' ? 'active' : ''}`} onClick={() => setActiveTab('infos')}>Infos personnelles</button></li>
                    <li><button className={`account-btn ${activeTab === 'adresses' ? 'active' : ''}`} onClick={() => setActiveTab('adresses')}>Mes adresses</button></li>
                    <li><button className={`account-btn ${activeTab === 'historique' ? 'active' : ''}`} onClick={() => setActiveTab('historique')}>Historique commandes</button></li>
                    <li><button className={`account-btn ${activeTab === 'suivi' ? 'active' : ''}`} onClick={() => setActiveTab('suivi')}>Suivi commandes</button></li>
                    <li><button className="btn-logout" onClick={() => { logout(); navigate('/'); }}>Déconnexion</button></li>
                </ul>
            </aside>
            <main className="account-content">{renderContent()}</main>
            {selectedOrderId && <DetailedOrderModal orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />}
        </div>
    );
};

const InfosPersonnelles = ({ user, onUpdateUser }) => {
    const [formData, setFormData] = useState({ nom: user.nom || '', prenom: user.prenom || '' });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });
        try {
            await updateUser(formData);
            setMessage({ type: 'success', text: 'Informations mises à jour avec succès !' });
            onUpdateUser({ ...user, ...formData });
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="account-section">
            <h2>Mes informations personnelles</h2>
            {message.text && <div className={`account-message ${message.type}`}>{message.text}</div>}
            <form className="account-form" onSubmit={handleSubmit}>
                <div className="form-group"><label htmlFor="prenom">Prénom</label><input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required /></div>
                <div className="form-group"><label htmlFor="nom">Nom</label><input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} required /></div>
                <div className="form-group"><label>Email</label><input type="email" defaultValue={user.email} disabled /><small className="input-help">L'email ne peut pas être modifié.</small></div>
                <div className="security-section"><label>Sécurité</label><button type="button" className="btn-secondary" onClick={() => setIsPasswordModalOpen(true)}>Modifier mon mot de passe</button></div>
                <div className="form-actions"><button className="btn-save" disabled={isSubmitting}>{isSubmitting ? 'Enregistrement...' : 'Enregistrer'}</button></div>
            </form>
            {isPasswordModalOpen && <PasswordChangeModal onClose={() => setIsPasswordModalOpen(false)} />}
        </div>
    );
};

const Adresses = ({ user, onUpdateUser }) => {
    const [editingAddress, setEditingAddress] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSaveAddress = async (type, addressData) => {
        setMessage({ type: '', text: '' });
        const dataToSend = { [`adresse_${type}`]: addressData.adresse, [`cp_${type}`]: addressData.cp, [`ville_${type}`]: addressData.ville };
        try {
            await updateUser(dataToSend);
            setMessage({ type: 'success', text: 'Adresse mise à jour avec succès !' });
            onUpdateUser({ ...user, ...dataToSend });
            setEditingAddress(null);
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        }
    };

    return (
        <div className="account-section">
            <h2>Mes adresses</h2>
            {message.text && <div className={`account-message ${message.type}`}>{message.text}</div>}
            <div className="addresses-grid">
                <div className="address-card">
                    <h3>Adresse de Livraison</h3>
                    {editingAddress === 'livraison' ? (
                        <AddressForm type="livraison" initialData={{ adresse: user.adresse_livraison, cp: user.cp_livraison, ville: user.ville_livraison }} onCancel={() => setEditingAddress(null)} onSave={handleSaveAddress} />
                    ) : (
                        user.adresse_livraison ? (
                            <div className="address-details">
                                <p>{user.prenom} {user.nom}</p><p>{user.adresse_livraison}</p><p>{user.cp_livraison} {user.ville_livraison}</p>
                                <button className="btn-edit-address" onClick={() => setEditingAddress('livraison')}>Modifier</button>
                            </div>
                        ) : (
                            <div><p className="no-address-msg">Aucune adresse de livraison.</p><button className="btn-add-address" onClick={() => setEditingAddress('livraison')}>+ Ajouter</button></div>
                        )
                    )}
                </div>
                <div className="address-card">
                    <h3>Adresse de Facturation</h3>
                    {editingAddress === 'facturation' ? (
                        <AddressForm type="facturation" initialData={{ adresse: user.adresse_facturation, cp: user.cp_facturation, ville: user.ville_facturation }} onCancel={() => setEditingAddress(null)} onSave={handleSaveAddress} />
                    ) : (
                        user.adresse_facturation ? (
                            <div className="address-details">
                                <p>{user.prenom} {user.nom}</p><p>{user.adresse_facturation}</p><p>{user.cp_facturation} {user.ville_facturation}</p>
                                <button className="btn-edit-address" onClick={() => setEditingAddress('facturation')}>Modifier</button>
                            </div>
                        ) : (
                            <div><p className="no-address-msg">Aucune adresse de facturation.</p><button className="btn-add-address" onClick={() => setEditingAddress('facturation')}>+ Ajouter</button></div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

const AddressForm = ({ type, initialData, onCancel, onSave }) => {
    const [formData, setFormData] = useState({ adresse: initialData?.adresse || '', cp: initialData?.cp || '', ville: initialData?.ville || '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => { e.preventDefault(); onSave(type, formData); };
    return (
        <div className="address-form-container">
            <h4>Modifier l'adresse de {type}</h4>
            <form onSubmit={handleSubmit} className="account-form">
                <div className="form-group"><label>Adresse</label><input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required /></div>
                <div className="form-row">
                    <div className="form-group form-group-cp"><label>Code Postal</label><input type="text" name="cp" value={formData.cp} onChange={handleChange} required /></div>
                    <div className="form-group form-group-ville"><label>Ville</label><input type="text" name="ville" value={formData.ville} onChange={handleChange} required /></div>
                </div>
                <div className="address-form-actions"><button type="submit" className="btn-save">Enregistrer</button><button type="button" onClick={onCancel} className="btn-secondary">Annuler</button></div>
            </form>
        </div>
    );
};

const HistoriqueCommandes = ({ orders, isLoading, error, onViewDetails }) => {
    if (isLoading) return <div>Chargement de l'historique...</div>;
    if (error) return <div className="account-message error">{error}</div>;
    return (
        <div className="account-section">
            <h2>Historique des commandes</h2>
            <OrderList orders={orders} onViewDetails={onViewDetails} />
        </div>
    );
};

const SuiviCommandes = ({ orders, isLoading, error, onViewDetails }) => {
    if (isLoading) return <div>Chargement du suivi...</div>;
    if (error) return <div className="account-message error">{error}</div>;
    const activeOrders = orders.filter(order => order.statut_commande !== 'Livré' && order.statut_commande !== 'Annulé');
    return (
        <div className="account-section">
            <h2>Suivi des commandes</h2>
            {activeOrders.length === 0 ? <p>Aucune commande en cours.</p> : <OrderList orders={activeOrders} onViewDetails={onViewDetails} />}
        </div>
    );
};

export default Account;
