import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [AuthenticatedEmployee, setAuthenticatedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    console.log("Retrieved from localStorage - Token:", token, "Username:", username);
    if (token && username) {
      setUser({ token, username });
      fetchAuthenticatedEmployee(username, token);
    }
  }, []);

  const fetchAuthenticatedEmployee = async (username, token) => {
    console.log("Fetching employee with username:", username, "and token:", token);
    try {
      const response = await axios.get(`http://localhost:8085/employees/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAuthenticatedEmployee(response.data);
      console.log("Employee loaded:", response.data);
    } catch (error) {
      console.error("Failed to fetch employee data", error);
    }
  };

  const login = (token, username) => {
    console.log("Logging in with token:", token, "Username:", username);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUser({ token, username });
    fetchAuthenticatedEmployee(username, token);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    setAuthenticatedEmployee(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, AuthenticatedEmployee, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
