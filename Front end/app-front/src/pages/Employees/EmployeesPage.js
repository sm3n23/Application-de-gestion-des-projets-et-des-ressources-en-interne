import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import EmployeeTable from "./EmployeesTable";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import Pagination from "./Pagination";

const processEmployees = (employees, projects) => {
  return employees.map((employee) => {
    const tasks = employee.taches ? employee.taches.map((tache) => tache.name) : ["No Tasks Assigned"];
    const projectNames = projects
      .filter((project) => project.employees.some((projEmp) => projEmp.id === employee.id))
      .map((project) => project.name)
      .join(', ') || "No Project";

    return {
      id: employee.id,
      picture: employee.picture,
      name: employee.name,
      projectName: projectNames,
      tasks: tasks.length > 0 ? tasks : ["No Tasks Assigned"],
    };
  });
};

const EmployeePage = () => {
  const { AuthenticatedEmployee } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  useEffect(() => {
    loadEmployeesAndProjects();
  }, []);

  const loadEmployeesAndProjects = async () => {
    try {
      const [employeesResponse, projectsResponse] = await Promise.all([
        axios.get("http://localhost:8085/employees"),
        axios.get("http://localhost:8085/allprojects"),
      ]);

      const allEmployees = employeesResponse.data;
      const allProjects = projectsResponse.data;

      const processedEmployees = processEmployees(allEmployees, allProjects);

      setProjects(allProjects);
      setEmployees(processedEmployees);
    } catch (error) {
      console.error("Failed to load employees and projects:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="recherche"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control my-3"
        />
      </div>
      {AuthenticatedEmployee && AuthenticatedEmployee.role === "RH" && (
        <div className="d-flex justify-content-end">
          <Link to="/Collaborateur/add" className="btn btn-primary btn-orange mx-3">
            <i className="fas fa-circle-plus"></i> Ajouter Collaborateur
          </Link>
        </div>
      )}
      {AuthenticatedEmployee && AuthenticatedEmployee.role === "ChefDeProjet" && (
        <div className="d-flex justify-content-end">
          <Link to="/demandes-congés" className="btn btn-primary btn-orange mx-3">
            Gérer les vacances
          </Link>
        </div>
      )}
      <EmployeeTable employees={currentEmployees} setEmployees={setEmployees} />
      <Pagination
        itemsPerPage={employeesPerPage}
        totalItems={filteredEmployees.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default EmployeePage;
