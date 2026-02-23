import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import PasswordChangeModal from '../components/PasswordChangeModal.jsx';
import DetailedOrderModal from '../components/DetailedOrderModal.jsx';
import OrderList from '../components/OrderList.jsx'; // Import du composant OrderList
import './styles/Account.css';

const Account = () => {
    const { user, logout, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('infos');
    
    // État pour les commandes (remonté ici)
    const [orders, setOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [ordersError, setOrdersError] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null); // État pour la modale de détails

    useEffect(() => {
        if (user) {
            console.log("Données utilisateur complètes :", user);
            fetchOrders(); // Charger les commandes dès que l'utilisateur est là
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des commandes');
            }
            
            const data = await response.json();
            setOrders(data.orders || data);
        } catch (err) {
            console.error(err);
            setOrdersError('Impossible de charger l\'historique des commandes.');
        } finally {
            setIsLoadingOrders(false);
        }
    };

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
                    <li>
                        <button 
                            className={activeTab === 'infos' ? 'active' : ''} 
                            onClick={() => setActiveTab('infos')}
                        >
                            Infos personnelles
                        </button>
                    </li>
                    <li>
                        <button 
                            className={activeTab === 'adresses' ? 'active' : ''} 
                            onClick={() => setActiveTab('adresses')}
                        >
                            Mes adresses
                        </button>
                    </li>
                    <li>
                        <button 
                            className={activeTab === 'historique' ? 'active' : ''} 
                            onClick={() => setActiveTab('historique')}
                        >
                            Historique commandes
                        </button>
                    </li>
                    <li>
                        <button 
                            className={activeTab === 'suivi' ? 'active' : ''} 
                            onClick={() => setActiveTab('suivi')}
                        >
                            Suivi commandes
                        </button>
                    </li>
                    <li>
                        <button onClick={() => { logout(); navigate('/'); }} style={{color: 'var(--color-accent-danger)'}}>
                            Déconnexion
                        </button>
                    </li>
                </ul>
            </aside>
            
            <main className="account-content">
                {renderContent()}
            </main>

            {/* Modale de détails affichée au niveau global de la page Account */}
            {selectedOrderId && (
                <DetailedOrderModal 
                    orderId={selectedOrderId} 
                    onClose={() => setSelectedOrderId(null)} 
                />
            )}
        </div>
    );
};

// --- Sous-composants ---

const InfosPersonnelles = ({ user, onUpdateUser }) => {
    const [formData, setFormData] = useState({
        nom: user.nom || '',
        prenom: user.prenom || ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la mise à jour');
            }

            setMessage({ type: 'success', text: 'Informations mises à jour avec succès !' });
            
            const updatedUser = { ...user, nom: formData.nom, prenom: formData.prenom };
            onUpdateUser(updatedUser);

        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="account-section">
            <h2>Mes informations personnelles</h2>
            
            {message.text && (
                <div style={{
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '6px',
                    backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: message.type === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                    {message.text}
                </div>
            )}

            <form className="account-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input 
                        type="text" 
                        id="prenom"
                        name="prenom"
                        value={formData.prenom} 
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input 
                        type="text" 
                        id="nom"
                        name="nom"
                        value={formData.nom} 
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={user.email} disabled style={{backgroundColor: '#f0f0f0', cursor: 'not-allowed'}} />
                    <small style={{color: 'var(--color-text-muted)', display: 'block', marginTop: '5px'}}>L'email ne peut pas être modifié.</small>
                </div>
                
                <div className="form-group" style={{marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem'}}>
                    <label>Sécurité</label>
                    <button 
                        type="button" 
                        className="btn-secondary" 
                        onClick={() => setIsPasswordModalOpen(true)}
                        style={{width: 'auto', display: 'inline-block'}}
                    >
                        Modifier mon mot de passe
                    </button>
                </div>

                <div style={{marginTop: '2rem'}}>
                    <button className="btn-save" disabled={isSubmitting}>
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                </div>
            </form>

            {isPasswordModalOpen && (
                <PasswordChangeModal onClose={() => setIsPasswordModalOpen(false)} />
            )}
        </div>
    );
};

const AddressForm = ({ type, initialData, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        adresse: initialData?.adresse || '',
        cp: initialData?.cp || '',
        ville: initialData?.ville || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(type, formData);
    };

    return (
        <div className="address-form-container" style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '1rem' }}>Modifier l'adresse de {type}</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Adresse</label>
                    <input 
                        type="text" 
                        name="adresse" 
                        value={formData.adresse} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border-light)' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Code Postal</label>
                        <input 
                            type="text" 
                            name="cp" 
                            value={formData.cp} 
                            onChange={handleChange} 
                            required 
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border-light)' }}
                        />
                    </div>
                    <div className="form-group" style={{ flex: 2 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Ville</label>
                        <input 
                            type="text" 
                            name="ville" 
                            value={formData.ville} 
                            onChange={handleChange} 
                            required 
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border-light)' }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn-save" style={{ padding: '8px 16px' }}>Enregistrer</button>
                    <button type="button" onClick={onCancel} style={{ padding: '8px 16px', background: 'none', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }}>Annuler</button>
                </div>
            </form>
        </div>
    );
};

const Adresses = ({ user, onUpdateUser }) => {
    const [editingAddress, setEditingAddress] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSaveAddress = async (type, addressData) => {
        setMessage({ type: '', text: '' });
        
        const dataToSend = {
            ...user, 
            [`adresse_${type}`]: addressData.adresse,
            [`cp_${type}`]: addressData.cp,
            [`ville_${type}`]: addressData.ville
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la mise à jour de l\'adresse');
            }

            setMessage({ type: 'success', text: 'Adresse mise à jour avec succès !' });
            onUpdateUser(dataToSend); 
            setEditingAddress(null);

        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: err.message });
        }
    };

    return (
        <div className="account-section">
            <h2>Mes adresses</h2>
            
            {message.text && (
                <div style={{
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '6px',
                    backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: message.type === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                    {message.text}
                </div>
            )}

            <div className="addresses-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                
                {/* Adresse de Livraison */}
                <div className="address-card" style={{ border: '1px solid var(--color-border)', padding: '1.5rem', borderRadius: '8px', backgroundColor: 'var(--color-background-offwhite)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Adresse de Livraison</h3>
                    
                    {editingAddress === 'livraison' ? (
                        <AddressForm 
                            type="livraison" 
                            initialData={{
                                adresse: user.adresse_livraison,
                                cp: user.cp_livraison,
                                ville: user.ville_livraison
                            }}
                            onCancel={() => setEditingAddress(null)}
                            onSave={handleSaveAddress}
                        />
                    ) : (
                        <>
                            {user.adresse_livraison ? (
                                <div className="address-details">
                                    <p>{user.prenom} {user.nom}</p>
                                    <p>{user.adresse_livraison}</p>
                                    <p>{user.cp_livraison} {user.ville_livraison}</p>
                                    <button 
                                        className="btn-edit" 
                                        onClick={() => setEditingAddress('livraison')}
                                        style={{ marginTop: '1rem', color: 'var(--color-accent-gold)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}
                                    >
                                        Modifier
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Aucune adresse de livraison enregistrée.</p>
                                    <button 
                                        className="btn-add" 
                                        onClick={() => setEditingAddress('livraison')}
                                        style={{ marginTop: '1rem', color: 'var(--color-primary-green)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}
                                    >
                                        + Ajouter une adresse
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Adresse de Facturation */}
                <div className="address-card" style={{ border: '1px solid var(--color-border)', padding: '1.5rem', borderRadius: '8px', backgroundColor: 'var(--color-background-offwhite)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-text-dark)' }}>Adresse de Facturation</h3>
                    
                    {editingAddress === 'facturation' ? (
                        <AddressForm 
                            type="facturation" 
                            initialData={{
                                adresse: user.adresse_facturation,
                                cp: user.cp_facturation,
                                ville: user.ville_facturation
                            }}
                            onCancel={() => setEditingAddress(null)}
                            onSave={handleSaveAddress}
                        />
                    ) : (
                        <>
                            {user.adresse_facturation ? (
                                <div className="address-details">
                                    <p>{user.prenom} {user.nom}</p>
                                    <p>{user.adresse_facturation}</p>
                                    <p>{user.cp_facturation} {user.ville_facturation}</p>
                                    <button 
                                        className="btn-edit" 
                                        onClick={() => setEditingAddress('facturation')}
                                        style={{ marginTop: '1rem', color: 'var(--color-accent-gold)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}
                                    >
                                        Modifier
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Aucune adresse de facturation enregistrée.</p>
                                    <button 
                                        className="btn-add" 
                                        onClick={() => setEditingAddress('facturation')}
                                        style={{ marginTop: '1rem', color: 'var(--color-primary-green)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}
                                    >
                                        + Ajouter une adresse
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Composants Historique et Suivi utilisant OrderList ---

const HistoriqueCommandes = ({ orders, isLoading, error, onViewDetails }) => {
    if (isLoading) return <div>Chargement de l'historique...</div>;
    if (error) return <div style={{color: 'var(--color-accent-danger)'}}>{error}</div>;

    return (
        <div className="account-section">
            <h2>Historique des commandes</h2>
            <OrderList orders={orders} onViewDetails={onViewDetails} />
        </div>
    );
};

const SuiviCommandes = ({ orders, isLoading, error, onViewDetails }) => {
    if (isLoading) return <div>Chargement du suivi...</div>;
    if (error) return <div style={{color: 'var(--color-accent-danger)'}}>{error}</div>;

    // Filtrer les commandes en cours (tout ce qui n'est pas Livré ou Annulé)
    const activeOrders = orders.filter(order => 
        order.statut_commande !== 'Livré' && order.statut_commande !== 'Annulé'
    );

    return (
        <div className="account-section">
            <h2>Suivi des commandes</h2>
            {activeOrders.length === 0 ? (
                <p>Aucune commande en cours de traitement.</p>
            ) : (
                <OrderList orders={activeOrders} onViewDetails={onViewDetails} />
            )}
        </div>
    );
};

export default Account;
