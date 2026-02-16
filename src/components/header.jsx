import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import CartIcon from './CartIcon.jsx';
import { Search } from 'lucide-react'; // Nettoyage des imports inutilisés
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
                {/* Les liens incorrects ont été supprimés */}
                
                {isSearchVisible ? (
                    <div className="search-bar-active">
                        <input type="text" placeholder="Rechercher..." autoFocus />
                        <button onClick={() => setIsSearchVisible(false)} className="close-search-btn">X</button>
                    </div>
                ) : (
                    <div className="search-icon" onClick={() => setIsSearchVisible(true)}>
                        <Search size={22} />
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
