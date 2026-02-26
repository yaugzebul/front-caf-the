import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './styles/CGV.css';

const CGV = () => {
    useDocumentTitle(
        "Conditions Générales de Vente - Caf'Thé", 
        "Consultez nos conditions générales de vente pour connaître vos droits et obligations lors de vos achats sur Caf'Thé.",
        "conditions générales de vente, cgv, légal, commande, livraison, paiement, rétractation"
    );

    return (
        <div className="cgv-container">
            <h1>Conditions Générales de Vente</h1>
            <p className="last-updated">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

            <section>
                <h2>1. Objet</h2>
                <p>Les présentes conditions générales de vente ont pour objet, d'une part, d'informer tout éventuel consommateur sur les conditions et modalités dans lesquelles le vendeur procède à la vente et à la livraison des produits commandés, et d'autre part, de définir les droits et obligations des parties dans le cadre de la vente de produits par le vendeur au consommateur qui s'appliquent, sans restriction ni réserve, à l'ensemble des ventes, par la société Caf'Thé, des produits proposés sur son site Internet.</p>
            </section>

            <section>
                <h2>2. Prix</h2>
                <p>Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC), sauf indication contraire et hors frais de traitement et d'expédition.</p>
                <p>En cas de commande vers un pays autre que la France métropolitaine vous êtes l'importateur du ou des produits concernés. Des droits de douane ou autres taxes locales ou droits d'importation ou taxes d'état sont susceptibles d'être exigibles. Ces droits et sommes ne relèvent pas du ressort de la société Caf'Thé.</p>
            </section>

            <section>
                <h2>3. Commandes</h2>
                <p>Vous pouvez passer commande :</p>
                <ul>
                    <li>Sur Internet : www.cafthe.com</li>
                    <li>Par téléphone au 01 23 45 67 89</li>
                </ul>
                <p>Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.</p>
            </section>

            <section>
                <h2>4. Validation</h2>
                <p>Vous déclarez avoir pris connaissance et accepté les présentes Conditions Générales de Vente avant la passation de votre commande. La validation de votre commande vaut donc acceptation de ces Conditions Générales de Vente.</p>
            </section>

            <section>
                <h2>5. Disponibilité</h2>
                <p>Nos offres de produits et prix sont valables tant qu'ils sont visibles sur le site, dans la limite des stocks disponibles.</p>
            </section>

            <section>
                <h2>6. Livraison</h2>
                <p>Les produits sont livrés à l'adresse de livraison que vous avez indiquée au cours du processus de commande. Le délai de livraison comprend le temps de préparation du colis ainsi que le temps d'acheminement.</p>
            </section>

            <section>
                <h2>7. Paiement</h2>
                <p>Le règlement de vos achats s'effectue par carte bancaire grâce au système sécurisé.</p>
            </section>

            <section>
                <h2>8. Droit de rétractation</h2>
                <p>Conformément aux dispositions légales en vigueur, vous disposez d'un délai de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité.</p>
            </section>
        </div>
    );
};

export default CGV;
