import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx"; // 1. Importer le hook
import CartIcon from './CartIcon.jsx';
import { Search, Menu, X, User, Sun, Moon } from 'lucide-react'; // 2. Importer Sun et Moon
import './styles/header.css';
import logo from '/images/logo-site.svg';

const Header = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme(); // 3. Utiliser le hook
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/produits?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchVisible(false);
            setSearchQuery('');
            setIsMenuOpen(false);
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
            <div className="navbar-burger" onClick={toggleMenu}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>

            <div className="navbar-center">
                <Link to="/" onClick={closeMenu}>
                    <img src={logo} alt="Logo Caf'Thé" className="navbar-logo" />
                </Link>
            </div>

            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/produits?category=cafes" className="nav-link" onClick={closeMenu}>CAFÉS</Link>
                <Link to="/produits?category=thes" className="nav-link" onClick={closeMenu}>THÉS ET INFUSIONS</Link>
                <Link to="/produits?category=accessoires" className="nav-link" onClick={closeMenu}>ACCESSOIRES</Link>
                
                <div className="mobile-auth-links">
                    {/* Bouton Thème Mobile */}
                    <button className="theme-toggle-btn mobile" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        <span>{theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}</span>
                    </button>

                    {isAuthenticated ? (
                        <>
                            <span className="navbar-user">Bonjour, {user.prenom}</span>
                            <Link to="/compte" className="navbar-link-auth" onClick={closeMenu}>Mon Compte</Link>
                            <button className="navbar-logout-button" onClick={handleLogout}>Déconnexion</button>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-link-auth" onClick={closeMenu}>Connexion</Link>
                    )}
                </div>
            </div>

            <div className="navbar-right">
                {/* Bouton Thème Desktop */}
                <button className="theme-toggle-btn desktop" onClick={toggleTheme} title="Changer de thème">
                    {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                </button>

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
                
                <div className="desktop-auth-links">
                    {isAuthenticated ? (
                        <>
                            <span className="navbar-user">
                                Bonjour, {user.prenom}
                            </span>
                            <Link to="/compte" className="account-icon-link" title="Mon Compte">
                                <User size={24} />
                            </Link>
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
