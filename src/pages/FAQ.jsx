import React, { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './styles/FAQ.css';

// Composant pour un seul item de la FAQ
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span>{question}</span>
                <span className="faq-icon">{isOpen ? '-' : '+'}</span>
            </button>
            <div className="faq-answer">
                <p>{answer}</p>
            </div>
        </div>
    );
};

// Page FAQ principale
const FAQ = () => {
    useDocumentTitle(
        "FAQ - Questions Fréquentes | Caf'Thé",
        "Trouvez les réponses à vos questions sur nos produits, la livraison, le paiement et votre compte client.",
        "faq, questions fréquentes, aide, support, livraison, paiement, commande"
    );

    const faqData = [
        {
            question: "Quels sont les délais de livraison ?",
            answer: "Nos délais de livraison standard sont de 3 à 5 jours ouvrés pour la France métropolitaine. Vous recevrez un email de confirmation d'expédition avec un numéro de suivi."
        },
        {
            question: "Comment puis-je suivre ma commande ?",
            answer: "Une fois votre commande expédiée, vous pouvez la suivre via la section 'Suivi commandes' de votre compte client. Le numéro de suivi y sera indiqué."
        },
        {
            question: "Quels moyens de paiement acceptez-vous ?",
            answer: "Nous acceptons les paiements par carte bancaire (Visa, MasterCard, American Express) via notre plateforme sécurisée Stripe."
        },
        {
            question: "Puis-je modifier ou annuler ma commande ?",
            answer: "Si votre commande n'a pas encore été préparée, vous pouvez nous contacter via le formulaire de contact pour demander une modification ou une annulation. Une fois expédiée, la commande ne peut plus être modifiée."
        },
        {
            question: "Comment conserver mon café en grain ?",
            answer: "Pour une fraîcheur optimale, nous vous conseillons de conserver votre café dans un contenant hermétique, à l'abri de la lumière, de la chaleur et de l'humidité. Évitez le réfrigérateur."
        }
    ];

    return (
        <div className="faq-container">
            <div className="faq-header">
                <h1>Questions Fréquentes</h1>
                <p>Besoin d'aide ? Trouvez votre réponse ici.</p>
            </div>
            <div className="faq-list">
                {faqData.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
