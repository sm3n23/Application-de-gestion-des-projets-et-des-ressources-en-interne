import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login/login';
import Home from './pages/Home/Home';
import AddEmployee from "./pages/Employees/AddEmployee/addEmployee";
import EditEmployee from "./pages/Employees/EditEmployee/EditEmployee";
import EditEmployeeDetails from "./pages/Employees/EditEmployee/EditEmployeeDetails";
import Sidebar from "./layout/sidebar";
import EmployeePage from "./pages/Employees/EmployeesPage";
import ProjectPage from "./pages/Projects/ProjectPage";
import EditProject from "./pages/Projects/EditProject/EditProject";
import AddProject from "./pages/Projects/AddProject/AddProject";
import Profile from "./pages/Employees/Profile/Profile";
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
};

export default App;