import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/api/authApi";
import {
  setCredentials,
  setError,
  clearError,
} from "../store/slices/authSlice";
import { selectError, selectIsAuthenticated } from "../store/slices/authSlice";
import "../assets/css/main.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Hook RTK Query pour la mutation de login
  const [login, { isLoading }] = useLoginMutation();

  // Sélecteurs Redux
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Redirection si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Nettoyer les erreurs précédentes
    dispatch(clearError());

    try {
      // Appel API de connexion
      const result = await login({
        email,
        password,
      }).unwrap();

      console.log("Connexion réussie:", result);

      // Si succès, sauvegarder les credentials
      dispatch(
        setCredentials({
          user: null, // Les données user seront récupérées avec getProfile
          token: result.body.token, // Le token est dans body.token
        })
      );

      // Rediriger vers la page utilisateur
      navigate("/user");
    } catch (err) {
      // Gestion des erreurs
      console.error("Erreur de connexion:", err);
      const errorMessage = err.data?.message || err.message || "Erreur de connexion. Vérifiez vos identifiants.";
      dispatch(setError(errorMessage));
    }
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>

          {/* Affichage des erreurs */}
          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Sign In"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignIn;
