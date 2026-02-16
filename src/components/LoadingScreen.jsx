import React from 'react';
import './styles/LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Chargement...</p>
        </div>
    );
};

export default LoadingScreen;
