import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./pages/Employees/AddEmployee/addEmployee";
import EditEmployee from "./pages/Employees/EditEmployee/EditEmployee";
import Sidebar from "./layout/sidebar";
import EmployeePage from "./pages/Employees/EmployeesPage";
import ProjectPage from "./pages/Projects/ProjectPage";
import EditProject from "./pages/Projects/EditProject/EditProject";
import AddProject from "./pages/Projects/AddProject/AddProject";
import Profile from "./pages/Employees/Profile/Profile";
import Test from "./pages/Testhtml/Test";

function App() {
  return (
    
    <div>
      <Router>
      
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/collaborateur" element={<EmployeePage/>}></Route>
          <Route exact path="/projects" element={<ProjectPage/>}></Route>
          <Route exact path="/collaborateur/edit/:id" element={<EditEmployee />}></Route>
          <Route exact path="/addemployee" element={<AddEmployee />}></Route>
          <Route exact path="/projects/edit/:id" element={<EditProject />}></Route>
          <Route exact path="/projects/add" element={<AddProject />}></Route>
          <Route exact path="/collaborateur/view/:id" element={<Profile></Profile>}></Route>
          <Route exact path="/collaborateur/add" element={<AddEmployee></AddEmployee>}></Route>
          <Route exact path="/testTable" element={<Test></Test>}></Route>
          
          
        </Routes>
      </div>
      </Router>
    </div>
  )
}

export default App;
