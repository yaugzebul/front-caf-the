import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login.jsx";
import Layout from "./layout/Layout.jsx";
import Accueil from "./pages/Accueil.jsx";
import Products from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

function App() {
return (
    <Router>
        <Routes>
            {/* Route parent : Layout contient header + outlet + footer */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Accueil />} />
                {/* id est un paramètre dynamique contenu dans l'url */}
                <Route path="produit/:id" element={<ProductDetail />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    </Router>
)
}

export default App;


