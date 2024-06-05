import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeTable from "./EmployeesTable";
import { Link } from 'react-router-dom';


const processProjects = (projects) => {
  let employees = [];

  projects.forEach((project) => {
    project.employees.forEach((employee) => {
      const tasks = employee.taches.map((tache) => tache.name);

      employees.push({
        id: employee.id,
        picture:employee.picture,
        name: employee.name,
        projectName: project.name,
        tasks: tasks.length > 0 ? tasks : ["No Tasks Assigned"],
      });
    });
  });

  return employees;
};

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadEmployeesAndProjects();
  }, []);

  const loadEmployeesAndProjects = async () => {
    try {
      const [employeesResponse, projectsResponse] = await Promise.all([
        axios.get("http://localhost:8085/employees"),
        axios.get("http://localhost:8085/projects"),
      ]);

      const allEmployees = employeesResponse.data;
      const allProjects = projectsResponse.data;

      const projectEmployees = processProjects(allProjects);

      const mergedEmployees = allEmployees.map((employee) => {
        const projectEmployee = projectEmployees.find((projEmp) => projEmp.id === employee.id);
        return projectEmployee
          ? projectEmployee
          : { ...employee, projectName: "No Project", tasks: "No Tasks Assigned" };
      });

      setProjects(allProjects);
      setEmployees(mergedEmployees);
    } catch (error) {
      console.error("Failed to load employees and projects:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="d-flex justify-content-end">
        <Link to="/Collaborateur/add" className="btn btn-primary btn-orange mx-3" >
        <i className="fas fa-circle-plus"></i> Ajouter Collaborateur
        </Link>
      </div>
      <EmployeeTable employees={filteredEmployees} setEmployees={setEmployees} />
    </div>
  );
};

export default EmployeePage;
