import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/navbar";
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewEmployee from "./employees/ViewEmployee";
import AddEmployee from "./employees/AddEmployee";
import EditEmployee from "./employees/EditEmployee";
import Sidebar from "./layout/sidebar";
import EmployeePage from "./pages/Employees/EmployeesPage";
import ProjectPage from "./pages/Projects/ProjectPage";

function App() {
  return (
    
    <div>
      <Router>
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/collaborateur" element={<EmployeePage/>}></Route>
          <Route exact path="/projects" element={<ProjectPage/>}></Route>
          <Route exact path="/viewemployee/:id" element={<ViewEmployee />}></Route>
          <Route exact path="/editemployee/:id" element={<EditEmployee />}></Route>
          <Route exact path="/addemployee" element={<AddEmployee />}></Route>
          
          <Route path="/search" element={<SearchResults />} /> 
        </Routes>
      </div>
      </Router>
    </div>
  )
}

export default App;
