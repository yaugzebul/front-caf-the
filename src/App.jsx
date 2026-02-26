import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Layout from "./layout/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import './App.css';

// Imports Lazy pour optimiser le chargement initial (Code Splitting)
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Account = lazy(() => import("./pages/Account.jsx"));
const CGV = lazy(() => import("./pages/CGV.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Accueil = lazy(() => import("./pages/Accueil.jsx"));
const Products = lazy(() => import("./pages/ProductList.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Panier = lazy(() => import("./pages/Panier.jsx"));

// Composant de chargement simple
const LoadingFallback = () => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh', 
        color: 'var(--color-primary-green)',
        fontSize: '1.2rem',
        fontWeight: '500'
    }}>
        Chargement...
    </div>
);

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <ThemeProvider>
                    <Router>
                        <ScrollToTop />
                        <Suspense fallback={<LoadingFallback />}>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Accueil />} />
                                    <Route path="produits" element={<Products />} />
                                    <Route path="produit/:id" element={<ProductDetail />} />
                                    <Route path="login" element={<Login />} />
                                    <Route path="register" element={<Register />} />
                                    <Route path="compte" element={<Account />} />
                                    <Route path="panier" element={<Panier />} />
                                    <Route path="cgv" element={<CGV />} />
                                    <Route path="politique-confidentialite" element={<PrivacyPolicy />} />
                                    <Route path="about" element={<About />} />
                                </Route>
                            </Routes>
                        </Suspense>
                    </Router>
                </ThemeProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
