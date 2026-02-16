import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react'; // 1. Importer les icônes
import './styles/footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h3 className="footer-title">Caf'Thé</h3>
                    <p>Sublimer vos rituels quotidiens par notre expertise. Découvrez des saveurs d'exception, sélectionnées avec passion.</p>
                </div>

                <div className="footer-section links">
                    <h3 className="footer-title">Liens Utiles</h3>
                    <ul>
                        <li><Link to="/about">À Propos</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/terms">Conditions d'Utilisation</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3 className="footer-title">Contactez-nous</h3>
                    <p>Email : contact@cafthe.com</p>
                    <p>Téléphone : 01 23 45 67 89</p>
                    <p>Adresse : 123 Rue du Goût, 75001 Paris</p>
                </div>

                <div className="footer-section social">
                    <h3 className="footer-title">Suivez-nous</h3>
                    <div className="social-icons">
                        {/* 2. Remplacer le texte par les composants d'icônes */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <Facebook size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Caf'Thé. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;
