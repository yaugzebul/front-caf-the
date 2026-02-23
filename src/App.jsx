import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import Layout from "./layout/Layout.jsx";
import Accueil from "./pages/Accueil.jsx";
import Products from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Panier from "./pages/Panier.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx"; // 1. Importer le ThemeProvider
import './App.css';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <ThemeProvider> {/* 2. Envelopper l'application */}
                    <Router>
                        <ScrollToTop />
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Accueil />} />
                                <Route path="produits" element={<Products />} />
                                <Route path="produit/:id" element={<ProductDetail />} />
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                                <Route path="compte" element={<Account />} />
                                <Route path="panier" element={<Panier />} />
                            </Route>
                        </Routes>
                    </Router>
                </ThemeProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
