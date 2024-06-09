// App.js
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./pages/Employees/AddEmployee/addEmployee";
import EditEmployee from "./pages/Employees/EditEmployee/EditEmployee";
import EditEmployeeDetails from "./pages/Employees/EditEmployee/EditEmployeeDetails";
import Sidebar from "./layout/sidebar";
import EmployeePage from "./pages/Employees/EmployeesPage";
import ProjectPage from "./pages/Projects/ProjectPage";
import EditProject from "./pages/Projects/EditProject/EditProject";
import AddProject from "./pages/Projects/AddProject/AddProject";
import Profile from "./pages/Employees/Profile/Profile";
import Login from "./pages/Login/LoginPage";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import { useContext } from "react";

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
          <Route exact path="/projects" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
          <Route exact path="/collaborateur/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
          <Route exact path="/collaborateur/modifierdetails/:id" element={<ProtectedRoute><EditEmployeeDetails /></ProtectedRoute>} />
          <Route exact path="/addemployee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route exact path="/projects/edit/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
          <Route exact path="/projects/add" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          <Route exact path="/collaborateur/view/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/collaborateur/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;