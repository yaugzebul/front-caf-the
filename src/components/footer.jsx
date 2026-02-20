import React from 'react';
import { Link } from 'react-router-dom';
import './styles/footer.css';
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

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
                        <li><Link to="#">CGV</Link></li>
                        <li><Link to="#">Politique de confidentialité</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3 className="footer-title">Contactez-nous</h3>
                    <address className="footer-address">
                        <a href="mailto:contact@cafthe.com" className="footer-link">Email : contact@cafthe.com</a><br />
                        <a href="tel:+33123456789" className="footer-link">Téléphone : 01 23 45 67 89</a><br />
                        <span>Adresse : 123 Rue du Goût, 75001 Paris</span>
                    </address>
                </div>

                <div className="footer-section social">
                    <h3 className="footer-title">Suivez-nous</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook  size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram  size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter  size={20} />
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
