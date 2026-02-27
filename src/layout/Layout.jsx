import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer.jsx';
import Header from '../components/header.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import StockErrorModal from '../components/StockErrorModal.jsx'; // Importer la modale d'erreur
import { CartContext } from '../context/CartContext.jsx';

const Layout = () => {
    const { confirmation, closeConfirmation, stockError, closeStockError } = useContext(CartContext);

    return (
        <>
            <Header />
            <Breadcrumbs />
            <main>
                <Outlet />
            </main>
            <Footer />

            {/* Modale de confirmation d'ajout */}
            {confirmation.isVisible && (
                <ConfirmationModal
                    product={confirmation.product}
                    quantity={confirmation.quantity}
                    onClose={closeConfirmation}
                />
            )}

            {/* Modale d'erreur de stock */}
            {stockError.isVisible && (
                <StockErrorModal
                    product={stockError.product}
                    onClose={closeStockError}
                />
            )}
        </>
    );
};

export default Layout;
