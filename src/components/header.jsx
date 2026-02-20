import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom"; // 1. Importer useNavigate
import { AuthContext } from "../context/AuthContext.jsx";
import CartIcon from './CartIcon.jsx';
import { Search } from 'lucide-react';
import './styles/header.css';
import logo from '/images/logo-site.svg';

const Header = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // 2. État pour la requête
    const navigate = useNavigate(); // 3. Initialiser le hook

    const handleLogout = () => {
        logout();
    }

    // 4. Fonction de gestion de la recherche
    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/produits?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchVisible(false); // Optionnel : fermer la barre après recherche
            setSearchQuery(''); // Optionnel : vider le champ
        }
    };

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
                        <input 
                            type="text" 
                            placeholder="Rechercher..." 
                            autoFocus 
                            value={searchQuery} // 5. Lier la valeur
                            onChange={(e) => setSearchQuery(e.target.value)} // 6. Mettre à jour l'état
                            onKeyDown={handleSearch} // 7. Écouter la touche Entrée
                        />
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
