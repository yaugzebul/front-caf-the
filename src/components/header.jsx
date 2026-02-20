import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import CartIcon from './CartIcon.jsx';
import { Search, Menu, X } from 'lucide-react'; // Importer Menu et X
import './styles/header.css';
import logo from '/images/logo-site.svg';

const Header = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu burger
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false); // Fermer le menu après déconnexion
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/produits?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchVisible(false);
            setSearchQuery('');
            setIsMenuOpen(false); // Fermer le menu après recherche
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            {/* Bouton Burger (visible uniquement sur mobile) */}
            <div className="navbar-burger" onClick={toggleMenu}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>

            {/* Logo (toujours visible) */}
            <div className="navbar-center">
                <Link to="/" onClick={closeMenu}>
                    <img src={logo} alt="Logo Caf'Thé" className="navbar-logo" />
                </Link>
            </div>

            {/* Liens de navigation (cachés sur mobile, affichés dans le menu déroulant) */}
            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/produits?category=cafes" className="nav-link" onClick={closeMenu}>CAFÉS</Link>
                <Link to="/produits?category=thes" className="nav-link" onClick={closeMenu}>THÉS ET INFUSIONS</Link>
                <Link to="/produits?category=accessoires" className="nav-link" onClick={closeMenu}>ACCESSOIRES</Link>
                
                {/* Liens d'auth pour mobile (intégrés dans le menu) */}
                <div className="mobile-auth-links">
                    {isAuthenticated ? (
                        <>
                            <span className="navbar-user">Bonjour, {user.prenom}</span>
                            <button className="navbar-logout-button" onClick={handleLogout}>Déconnexion</button>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-link-auth" onClick={closeMenu}>Connexion</Link>
                    )}
                </div>
            </div>

            {/* Partie droite (Recherche, Panier, Auth Desktop) */}
            <div className="navbar-right">
                {isSearchVisible ? (
                    <div className="search-bar-active">
                        <input 
                            type="text" 
                            placeholder="Rechercher..." 
                            autoFocus 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            onKeyDown={handleSearch} 
                        />
                        <button onClick={() => setIsSearchVisible(false)} className="close-search-btn">X</button>
                    </div>
                ) : (
                    <div className="search-icon" onClick={() => setIsSearchVisible(true)}>
                        <Search size={22} />
                    </div>
                )}

                <CartIcon />
                
                {/* Auth Desktop (caché sur mobile) */}
                <div className="desktop-auth-links">
                    {isAuthenticated ? (
                        <>
                            <span className="navbar-user">
                                Bonjour, {user.prenom}
                            </span>
                            <button className="navbar-logout-button" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-link-auth">
                            Connexion
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
