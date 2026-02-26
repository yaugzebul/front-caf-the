import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// Import optimisé
import X from 'lucide-react/dist/esm/icons/x';
import './styles/PasswordChangeModal.css';

const PasswordChangeModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        ancien_mot_de_passe: '',
        nouveau_mot_de_passe: '',
        confirmation_mot_de_passe: '' // Nom aligné avec l'API
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        // Validation côté front
        if (formData.nouveau_mot_de_passe !== formData.confirmation_mot_de_passe) {
            setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ancien_mot_de_passe: formData.ancien_mot_de_passe,
                    nouveau_mot_de_passe: formData.nouveau_mot_de_passe,
                    confirmation_mot_de_passe: formData.confirmation_mot_de_passe // Ajout du champ manquant
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors du changement de mot de passe');
            }

            setMessage({ type: 'success', text: 'Mot de passe modifié avec succès !' });
            
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const modalContent = (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content password-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={24} />
                </button>
                
                <h3>Modifier mon mot de passe</h3>
                
                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ancien_mot_de_passe">Ancien mot de passe</label>
                        <input 
                            type="password" 
                            id="ancien_mot_de_passe"
                            name="ancien_mot_de_passe"
                            value={formData.ancien_mot_de_passe}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nouveau_mot_de_passe">Nouveau mot de passe</label>
                        <input 
                            type="password" 
                            id="nouveau_mot_de_passe"
                            name="nouveau_mot_de_passe"
                            value={formData.nouveau_mot_de_passe}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmation_mot_de_passe">Confirmer le nouveau mot de passe</label>
                        <input 
                            type="password" 
                            id="confirmation_mot_de_passe"
                            name="confirmation_mot_de_passe" // Nom aligné avec le state et l'API
                            value={formData.confirmation_mot_de_passe}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Modification...' : 'Valider'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById('modal-root')
    );
};

export default PasswordChangeModal;
