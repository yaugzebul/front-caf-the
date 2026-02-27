import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { registerUser } from "../services/api.js";
import "./styles/Register.css";

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: "",
        confirm_mdp: ""
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useDocumentTitle("Inscription - Caf'Thé", "Créez votre compte pour profiter de nos offres exclusives et suivre vos commandes.", "inscription, créer compte, fidélité, register, nouveau client");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (formData.mot_de_passe !== formData.confirm_mdp) {
            setErrorMsg("Les mots de passe ne correspondent pas.");
            return;
        }

        if (!agreedToTerms) {
            setErrorMsg("Vous devez accepter les conditions générales de vente.");
            return;
        }

        try {
            const { confirm_mdp, ...dataToSend } = formData;
            const data = await registerUser(dataToSend);

            if (data.client) {
                login(data.client);
                navigate("/");
            } else {
                navigate("/login");
            }

        } catch (error) {
            console.error("Erreur lors de l'inscription: ", error);
            setErrorMsg(error.message || "Une erreur s'est produite lors de l'inscription");
        }
    };

    return (
        <div className="register-container">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nom">Nom :</label>
                    <input id="nom" name="nom" type="text" value={formData.nom} required placeholder="Votre nom" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom :</label>
                    <input id="prenom" name="prenom" type="text" value={formData.prenom} required placeholder="Votre prénom" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input id="email" name="email" type="email" value={formData.email} required placeholder="votre@email.fr" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="mot_de_passe">Mot de passe :</label>
                    <input id="mot_de_passe" name="mot_de_passe" type="password" value={formData.mot_de_passe} required placeholder="Votre mot de passe" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm_mdp">Confirmer le mot de passe :</label>
                    <input id="confirm_mdp" name="confirm_mdp" type="password" value={formData.confirm_mdp} required placeholder="Confirmez votre mot de passe" onChange={handleChange} />
                </div>
                <div className="form-group terms-group">
                    <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
                    <label htmlFor="terms">
                        J'accepte les <Link to="/cgv" target="_blank">Conditions Générales de Vente</Link>
                    </label>
                </div>
                {errorMsg && <div className="error-message">{errorMsg}</div>}
                <button type="submit" className="register-button">S'inscrire</button>
            </form>
            <div className="login-link">
                Déjà un compte ? <Link to="/login">Se connecter</Link>
            </div>
        </div>
    );
};

export default Register;
