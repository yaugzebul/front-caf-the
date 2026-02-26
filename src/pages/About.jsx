import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './styles/About.css';

const About = () => {
    useDocumentTitle(
        "À Propos de Caf'Thé", 
        "Découvrez l'histoire, les valeurs et les engagements de notre maison de thé et café.",
        "histoire, valeurs, engagement, éthique, qualité, Caf'Thé, torréfaction artisanale, commerce équitable"
    );

    return (
        <div className="about-container">
            <div className="about-hero">
                <h1>Notre Histoire</h1>
                <p>De la passion du grain à la tasse parfaite.</p>
            </div>

            <section className="about-section">
                <div className="about-content">
                    <h2>L'origine de Caf'Thé</h2>
                    <p>
                        Fondée en 2010 par deux passionnés de saveurs authentiques, Caf'Thé est née d'une volonté simple : 
                        proposer des cafés et des thés d'exception, sourcés de manière éthique et responsable.
                    </p>
                    <p>
                        Tout a commencé dans une petite boutique au cœur de Paris, où nous torréfiions nous-mêmes nos premiers grains. 
                        Aujourd'hui, notre expertise s'est affinée, mais notre mission reste la même : sublimer vos rituels quotidiens.
                    </p>
                </div>
                <div className="about-image">
                    <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop" alt="Notre boutique originale" />
                </div>
            </section>

            <section className="about-section reverse">
                <div className="about-content">
                    <h2>Nos Valeurs</h2>
                    <ul>
                        <li><strong>Qualité :</strong> Nous sélectionnons rigoureusement chaque produit pour ses qualités gustatives uniques.</li>
                        <li><strong>Éthique :</strong> Nous privilégions les circuits courts et le commerce équitable.</li>
                        <li><strong>Expertise :</strong> Nos baristas et sommeliers du thé sont formés pour vous conseiller au mieux.</li>
                    </ul>
                </div>
                <div className="about-image">
                    <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop" alt="Dégustation de café" />
                </div>
            </section>

            <section className="about-commitment">
                <h2>Notre Engagement Environnemental</h2>
                <p>
                    Chez Caf'Thé, nous croyons que le plaisir ne doit pas se faire au détriment de la planète. 
                    C'est pourquoi 100% de nos emballages sont recyclables ou compostables, et nous travaillons activement 
                    à réduire notre empreinte carbone à chaque étape de la production.
                </p>
            </section>
        </div>
    );
};

export default About;
