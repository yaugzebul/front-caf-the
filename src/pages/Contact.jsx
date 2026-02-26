import React, { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './styles/Contact.css';

const Contact = () => {
    useDocumentTitle(
        "Contactez-nous - Caf'Thé",
        "Une question ? Une suggestion ? Contactez l'équipe de Caf'Thé via notre formulaire ou par téléphone.",
        "contact, support, question, service client, email, téléphone"
    );

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pour l'instant, on simule un envoi réussi
        setFormStatus('Merci ! Votre message a bien été envoyé.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-page-container">
            <div className="contact-header">
                <h1>Contactez-nous</h1>
                <p>Nous sommes à votre écoute pour toute question ou suggestion.</p>
            </div>

            <div className="contact-content-wrapper">
                <div className="contact-form-section">
                    <h2>Envoyez-nous un message</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Votre nom</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Votre email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Votre message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-submit">Envoyer</button>
                    </form>
                    {formStatus && <p className="form-status-success">{formStatus}</p>}
                </div>

                <div className="contact-info-section">
                    <h2>Nos coordonnées</h2>
                    <div className="info-block">
                        <h3>Adresse</h3>
                        <p>123 Rue du Goût, 75001 Paris, France</p>
                    </div>
                    <div className="info-block">
                        <h3>Email</h3>
                        <p><a href="mailto:contact@cafthe.com">contact@cafthe.com</a></p>
                    </div>
                    <div className="info-block">
                        <h3>Téléphone</h3>
                        <p><a href="tel:+33123456789">01 23 45 67 89</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
