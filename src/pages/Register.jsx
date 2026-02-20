import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./styles/Register.css";

const Register = () => {
    const { login } = useContext(AuthContext); // Pour connecter l'utilisateur directement après inscription
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nom_client: "",
        prenom_client: "",
        email_client: "",
        mdp_client: "",
        confirm_mdp: ""
    });
    
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (formData.mdp_client !== formData.confirm_mdp) {
            setErrorMsg("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            // On prépare les données à envoyer (sans la confirmation de mdp)
            const dataToSend = {
                nom: formData.nom_client,
                prenom: formData.prenom_client,
                email: formData.email_client,
                mot_de_passe: formData.mdp_client
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(dataToSend),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Erreur lors de l'inscription");
                return;
            }

            // Si l'inscription réussit, on connecte l'utilisateur (si l'API renvoie le client)
            // Sinon, on redirige vers le login
            if (data.client) {
                login(data.client);
                navigate("/");
            } else {
                navigate("/login");
            }

        } catch (error) {
            console.error("Erreur lors de l'inscription: ", error);
            setErrorMsg("Une erreur s'est produite lors de l'inscription");
        }
    };

    return (
        <div className="register-container">
            <h2>Inscription</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nom_client">Nom :</label>
                    <input
                        id="nom_client"
                        name="nom_client"
                        type="text"
                        value={formData.nom_client}
                        required
                        placeholder="Votre nom"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="prenom_client">Prénom :</label>
                    <input
                        id="prenom_client"
                        name="prenom_client"
                        type="text"
                        value={formData.prenom_client}
                        required
                        placeholder="Votre prénom"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email_client">Email :</label>
                    <input
                        id="email_client"
                        name="email_client"
                        type="email"
                        value={formData.email_client}
                        required
                        placeholder="votre@email.fr"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mdp_client">Mot de passe :</label>
                    <input
                        id="mdp_client"
                        name="mdp_client"
                        type="password"
                        value={formData.mdp_client}
                        required
                        placeholder="Votre mot de passe"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm_mdp">Confirmer le mot de passe :</label>
                    <input
                        id="confirm_mdp"
                        name="confirm_mdp"
                        type="password"
                        value={formData.confirm_mdp}
                        required
                        placeholder="Confirmez votre mot de passe"
                        onChange={handleChange}
                    />
                </div>

                {errorMsg && <div className="error-message">{errorMsg}</div>}

                <button type="submit" className="register-button">
                    S'inscrire
                </button>
            </form>

            <div className="login-link">
                Déjà un compte ? <Link to="/login">Se connecter</Link>
            </div>
        </div>
    );
};

export default Register;
