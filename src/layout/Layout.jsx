import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer.jsx';
import Header from '../components/header.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import { CartContext } from '../context/CartContext.jsx';

const Layout = () => {
    const { confirmation, closeConfirmation } = useContext(CartContext);

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />

            {/* La modale s'affichera ici si elle est active */}
            {confirmation.isVisible && (
                <ConfirmationModal
                    product={confirmation.product}
                    quantity={confirmation.quantity}
                    onClose={closeConfirmation}
                />
            )}
        </>
    );
};

export default Layout;
