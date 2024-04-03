import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewEmployee from "./employees/ViewEmployee";
import AddEmployee from "./employees/AddEmployee";
import EditEmployee from "./employees/EditEmployee";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/viewemployee/:id" element={<ViewEmployee />}></Route>
        <Route exact path="/editemployee/:id" element={<EditEmployee />}></Route>
        <Route exact path="/addemployee" element={<AddEmployee />}></Route>
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
