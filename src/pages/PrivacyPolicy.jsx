import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
    useDocumentTitle(
        "Politique de Confidentialité - Caf'Thé", 
        "Découvrez comment Caf'Thé protège vos données personnelles et respecte votre vie privée.",
        "politique de confidentialité, données personnelles, rgpd, cookies, sécurité des données"
    );

    return (
        <div className="privacy-container">
            <h1>Politique de Confidentialité</h1>
            <p className="last-updated">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

            <section>
                <h2>1. Collecte de l'information</h2>
                <p>Nous recueillons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, faites un achat, participez à un concours, et / ou lorsque vous vous déconnectez. Les informations recueillies incluent votre nom, votre adresse e-mail, numéro de téléphone, et/ou carte de crédit.</p>
                <p>En outre, nous recevons et enregistrons automatiquement des informations à partir de votre ordinateur et navigateur, y compris votre adresse IP, vos logiciels et votre matériel, et la page que vous demandez.</p>
            </section>

            <section>
                <h2>2. Utilisation des informations</h2>
                <p>Toute les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
                <ul>
                    <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                    <li>Fournir un contenu publicitaire personnalisé</li>
                    <li>Améliorer notre site Web</li>
                    <li>Améliorer le service client et vos besoins de prise en charge</li>
                    <li>Vous contacter par e-mail</li>
                    <li>Administrer un concours, une promotion, ou une enquête</li>
                </ul>
            </section>

            <section>
                <h2>3. Confidentialité du commerce en ligne</h2>
                <p>Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.</p>
            </section>

            <section>
                <h2>4. Divulgation à des tiers</h2>
                <p>Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.</p>
            </section>

            <section>
                <h2>5. Protection des informations</h2>
                <p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne. Seuls les employés qui ont besoin d'effectuer un travail spécifique (par exemple, la facturation ou le service à la clientèle) ont accès aux informations personnelles identifiables.</p>
            </section>

            <section>
                <h2>6. Cookies</h2>
                <p>Nos cookies améliorent l'accès à notre site et identifient les visiteurs réguliers. En outre, nos cookies améliorent l'expérience d'utilisateur grâce au suivi et au ciblage de ses intérêts. Cependant, cette utilisation des cookies n'est en aucune façon liée à des informations personnelles identifiables sur notre site.</p>
            </section>

            <section>
                <h2>7. Consentement</h2>
                <p>En utilisant notre site, vous consentez à notre politique de confidentialité.</p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
