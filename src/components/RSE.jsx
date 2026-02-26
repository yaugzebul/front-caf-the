import React from 'react';
import './styles/RSE.css';
// Remplacement de react-icons par lucide-react (imports optimisés)
import Handshake from 'lucide-react/dist/esm/icons/handshake';
import Recycle from 'lucide-react/dist/esm/icons/recycle';
import Store from 'lucide-react/dist/esm/icons/store';

const RSE = () => {
    return (
        <div className="rse-section-wrapper">
            <div className="rse-section-content">
                <div className="rse-header">
                    <h2 className="rse-title">Un commerce juste et durable</h2>
                    <p className="rse-subtitle">
                        Parce qu'un produit d'exception ne peut exister sans le respect de la terre et des Hommes qui le cultivent.
                    </p>
                </div>
                <div className="rse-commitments">
                    <div className="commitment-item">
                        <div className="commitment-icon"><Handshake size={40} /></div>
                        <h3>Producteurs partenaires</h3>
                        <p>
                            Nous travaillons en direct avec des coopératives et des petits producteurs pour garantir une rémunération juste et des relations sur le long terme.
                        </p>
                    </div>
                    <div className="commitment-item">
                        <div className="commitment-icon"><Recycle size={40} /></div>
                        <h3>Emballages éco-responsables</h3>
                        <p>
                            Nos sachets sont conçus pour être recyclables ou compostables. Nous encourageons nos clients à venir avec leurs propres contenants en boutique.
                        </p>
                    </div>
                    <div className="commitment-item">
                        <div className="commitment-icon"><Store size={40} /></div>
                        <h3>Ancrage local</h3>
                        <p>
                            En tant que commerce de proximité, nous soutenons les initiatives locales et participons activement à la vie de notre quartier.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RSE;
