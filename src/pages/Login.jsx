import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom"; // Importer useNavigate
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { loginUser } from "../services/api.js";
import "./styles/Login.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialiser le hook
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useDocumentTitle("Connexion - Caf'Thé", "Connectez-vous à votre compte Caf'Thé pour suivre vos commandes et gérer vos informations.", "connexion compte, espace client, suivi commande, login");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const data = await loginUser(email, motDePasse);
            login(data.client);
            navigate("/"); // Utiliser navigate pour une redirection fluide
        } catch (error) {
            console.error("Erreur lors de la connexion: ", error);
            setErrorMsg(error.message || "Une erreur s'est produite lors de la connexion");
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        required
                        placeholder="votre@email.fr"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        id="password"
                        type="password"
                        value={motDePasse}
                        required
                        placeholder="Votre mot de passe"
                        onChange={(e) => setMotDePasse(e.target.value)}
                    />
                </div>

                {errorMsg && <div className="error-message">{errorMsg}</div>}

                <button type="submit" className="login-button">
                    Se Connecter
                </button>

                <button type="button" className="login-button" disabled>
                    Mot de passe oublié
                </button>

            </form>

            <div className="register-link">
                Pas encore de compte ? <Link to="/register">S'inscrire</Link>
            </div>
        </div>
    );
};

export default Login;
