// src/pages/Login/login.js
import axios from "axios";

export const login = async (username, password) => {
  const clientId = "projects-ressources-client"; // Replace with your Keycloak client ID
  const clientSecret = "xDsCIfwuu1hJhjbbMngJgO6zCX1gkyEe"; // Replace with your Keycloak client secret
  const authServerUrl = "http://localhost:8080/realms/projects-ressources-realm/protocol/openid-connect/token";

  const data = new URLSearchParams();
  data.append("grant_type", "password");
  data.append("client_id", clientId);
  data.append("client_secret", clientSecret);
  data.append("username", username);
  data.append("password", password);

  try {
    const response = await axios.post(authServerUrl, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to login");
  }
};
