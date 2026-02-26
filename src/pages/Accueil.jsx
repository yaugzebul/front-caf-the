import React from 'react';
import Hero from '../components/Hero.jsx';
import PromoSection from '../components/PromoSection.jsx';
import RSE from '../components/RSE.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function Accueil() {
    useDocumentTitle(
        "Caf'Thé - Accueil | Vente de thés et cafés d'exception",
        "Découvrez notre sélection de thés et cafés bio, torréfiés artisanalement.",
        "café, thé, infusion, bio, vrac, torréfaction artisanale, boutique en ligne, achat café, achat thé, accessoires thé café"
    );

    return (
        <div>
            <Hero />
            <PromoSection />
            <RSE />
        </div>
    );
}

export default Accueil;
