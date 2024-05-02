import React, { useState, useEffect } from "react";
import axios from "axios";

import EmployeeTable from "./EmployeesTable";

const processProjects = (projects) => {
  let employees = [];

  projects.forEach((project) => {
    const employeeTasks = project.taches.reduce((acc, tache) => {
      tache.employees.forEach((emp) => {
        if (!acc[emp.id]) {
          acc[emp.id] = [];
        }
        acc[emp.id].push(tache.name);
      });
      return acc;
    }, {});

    const projectEmployees = project.employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
      projectName: project.name,
      tasks: employeeTasks[employee.id]
        ? employeeTasks[employee.id]
        : "No Tasks Assigned",
    }));

    employees = employees.concat(projectEmployees);
  });

  return employees;
};

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const response = await axios.get("http://localhost:8085/projects");
    setProjects(response.data);
    setEmployees(processProjects(response.data));
  };

  return (
    <div className="container">
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default EmployeePage;
