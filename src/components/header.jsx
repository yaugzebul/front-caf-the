import React, { useState, useContext } from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";
import CartIcon from './CartIcon.jsx';
import './styles/header.css';
import logo from '/images/logo-site.svg';

const Header = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleLogout = () => {
        logout();
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/produits?category=cafes" className="nav-link">CAFÉS</Link>
                <Link to="/produits?category=thes" className="nav-link">THÉS ET INFUSIONS</Link>
                <Link to="/produits?category=accessoires" className="nav-link">ACCESSOIRES</Link>
            </div>

            <div className="navbar-center">
                <Link to="/">
                    <img src={logo} alt="Logo Caf'Thé" className="navbar-logo" />
                </Link>
            </div>

            <div className="navbar-right">
                {isSearchVisible ? (
                    <div className="search-bar-active">
                        <input type="text" placeholder="Rechercher..." autoFocus />
                        <button onClick={() => setIsSearchVisible(false)} className="close-search-btn">X</button>
                    </div>
                ) : (
                    // Remplacement de l'emoji par une icône SVG
                    <div className="search-icon" onClick={() => setIsSearchVisible(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                )}

                <CartIcon />
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
        </nav>
    );
}

export default Header;
