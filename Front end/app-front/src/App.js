<<<<<<< HEAD
// App.js
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login/login';
import Home from './pages/Home/Home';
>>>>>>> 02bf6d13d41e0a18176d7d5cd4bca65c934571e5
import AddEmployee from "./pages/Employees/AddEmployee/addEmployee";
import EditEmployee from "./pages/Employees/EditEmployee/EditEmployee";
import EditEmployeeDetails from "./pages/Employees/EditEmployee/EditEmployeeDetails";
import Sidebar from "./layout/sidebar";
import EmployeePage from "./pages/Employees/EmployeesPage";
import ProjectPage from "./pages/Projects/ProjectPage";
import EmployeeProjects from "./pages/Projects/EmployeeProjects";
import EditProject from "./pages/Projects/EditProject/EditProject";
import AddProject from "./pages/Projects/AddProject/AddProject";
import Profile from "./pages/Employees/Profile/Profile";
<<<<<<< HEAD
import Login from "./pages/Login/LoginPage";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import { useContext } from "react";
import HolidayRequestForm from "./pages/Employees/conge/HolidayRequestForm";
import HolidayRequestManagement from "./pages/Employees/conge/HolidayRequestManagement";
import MyHolidayRequests from "./pages/Employees/conge/MyHolidayRequests";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

const AppContent = () => {
  const { user } = useContext(AuthContext);

  

  return (
    <>
      {user && <Sidebar />}
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route exact path="/collaborateur" element={<ProtectedRoute><EmployeePage /></ProtectedRoute>} />
          <Route exact path="/allprojects" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
          <Route exact path="/projects" element={<ProtectedRoute><EmployeeProjects /></ProtectedRoute>} />
          <Route exact path="/collaborateur/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
          <Route exact path="/collaborateur/modifierdetails/:id" element={<ProtectedRoute><EditEmployeeDetails /></ProtectedRoute>} />
          <Route exact path="/addemployee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route exact path="/projects/edit/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
          <Route exact path="/projects/add" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          <Route exact path="/collaborateur/view/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/collaborateur/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/demande-congé" element={<HolidayRequestForm />} />
          <Route path="/demandes-congés" element={<HolidayRequestManagement />} />
          <Route path="/Mes-demandes-vacances" element={<MyHolidayRequests />} /> 
        </Routes>
      </div>
    </>
  );
=======
import Test from "./pages/Testhtml/Test";
import './App.css';
import axios from 'axios';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [employee, setEmployee] = useState(null);

    const handleLogin = async () => {
        setIsAuthenticated(true);
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            try {
                const response = await axios.get(`http://localhost:8085/employees/${username}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setEmployee(response.data);
                localStorage.setItem('employee', JSON.stringify(response.data));
            } catch (error) {
                console.error('Failed to fetch employee data:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('employee');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div>
                {isAuthenticated && <div className="logout-button-container"><button onClick={handleLogout} className="logout-button">Logout</button></div>}
                <Routes>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="*" element={<AuthenticatedLayout employee={employee} />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

const AuthenticatedLayout = ({ employee }) => (
    <div className="App">
        <Sidebar className="sidebar" employee={employee} />
        <div className="main-content">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/collaborateur" element={<EmployeePage />} />
                <Route exact path="/projects" element={<ProjectPage />} />
                <Route exact path="/collaborateur/edit/:id" element={<EditEmployee />} />
                <Route exact path="/collaborateur/modifierdetails/:id" element={<EditEmployeeDetails />} />
                <Route exact path="/addemployee" element={<AddEmployee />} />
                <Route exact path="/projects/edit/:id" element={<EditProject />} />
                <Route exact path="/projects/add" element={<AddProject />} />
                <Route exact path="/collaborateur/view/:id" element={<Profile />} />
                <Route exact path="/collaborateur/add" element={<AddEmployee />} />
                <Route exact path="/testTable" element={<Test />} />
            </Routes>
        </div>
    </div>
);

const PrivateRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
>>>>>>> 02bf6d13d41e0a18176d7d5cd4bca65c934571e5
};

export default App;