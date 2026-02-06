import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer.jsx';
import Header from '../components/header.jsx';

// Structure de la page

function Layout() {
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
}

export default Layout;