// src/pages/Login/LoginPage.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./LoginFunction";
import { AuthContext } from "../../context/AuthContext";
import './Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Apply custom styles to the body for the login page
    document.body.classList.add('custom-login-body');

    // Cleanup function to remove the custom styles when the component is unmounted
    return () => {
      document.body.classList.remove('custom-login-body');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      authLogin(token, username);
      navigate("/");
    } catch (error) {
      console.error("Failed to login", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="custom-login-background">
      <img src="/images/bplogo.png" alt="Company Logo" className="custom-login-logo" />
      <div className="custom-login-text">
        <h1>Heureux de vous voir !</h1>
        <p>Connectez-vous ou créez votre compte...</p>
      </div>
      <div className="custom-login-container">
        <div className="custom-login-section">
          
        <form className="custom-login-form" onSubmit={handleSubmit}>
          
            <label htmlFor="email">Username *</label>
            <input type="text"
              className="text-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre email" required />
            
            <label htmlFor="password">Mot de passe *</label>
            <input type="password"
            className="text-input"
             id="password" name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe" required />
            
            <div className="custom-login-options">
              <label className="box-label"><input type="checkbox" name="stay-connected" className="box-input" />
              <span className="box-label">Rester connectée</span> </label>
            </div>
            
            <button type="submit" className="custom-login-btn">CONNEXION</button>
          
        </form>
      </div>
    </div>
      
    </div>
  );
};

export default LoginPage;
