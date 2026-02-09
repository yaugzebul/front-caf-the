import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login.jsx";
import Layout from "./layout/Layout.jsx";
import Accueil from "./pages/Accueil.jsx";
import Products from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Panier from "./pages/Panier.jsx"; // Importer la page Panier
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
return (
  <AuthProvider>
    <CartProvider>
      <Router>
          <Routes>
                  <Route path="/" element={<Layout />}>
                  <Route index element={<Accueil />} />
                  <Route path="produits" element={<Products />} />
                  <Route path="produit/:id" element={<ProductDetail />} />
                  <Route path="login" element={<Login />} />
                  <Route path="panier" element={<Panier />} /> {/* Ajouter la route pour le panier */}
              </Route>
          </Routes>
      </Router>
    </CartProvider>
  </AuthProvider>
)
}

export default App;
