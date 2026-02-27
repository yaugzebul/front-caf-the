import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './styles/NotFound.css';

const NotFound = () => {
    useDocumentTitle("404 - Page non trouvée | Caf'Thé");

    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Oups ! Page non trouvée.</h2>
            <p className="not-found-text">
                La page que vous recherchez semble s'être égarée dans les arômes de café.
            </p>
            <Link to="/" className="btn-home">
                Retourner à l'accueil
            </Link>
        </div>
    );
};

export default NotFound;
