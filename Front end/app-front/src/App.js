import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewEmployee from "./employees/ViewEmployee";
import AddEmployee from "./employees/AddEmployee";
import EditEmployee from "./employees/EditEmployee";

function App() {
  return (
    /* <ReactKeycloakProvider authClient={keycloak}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/viewemployee/:id"
              element={<ViewEmployee />}
            ></Route>
            <Route
              exact
              path="/editemployee/:id"
              element={<EditEmployee />}
            ></Route>
            <Route exact path="/addemployee" element={<AddEmployee />}></Route>
          </Switch>
        </div>
      </Router>
    </ReactKeycloakProvider> */
    <div>
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
  )
}

export default App;
