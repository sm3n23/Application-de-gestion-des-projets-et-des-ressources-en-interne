import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeTable from "./EmployeesTable";
 

const processProjects = (projects) => {
  let employees = [];

  projects.forEach((project) => {
    project.employees.forEach((employee) => {
      const tasks = employee.taches.map((tache) => tache.name);

      employees.push({
        id: employee.id,
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

  useEffect(() => {
    loadEmployeesAndProjects();
  }, []);

  const loadEmployeesAndProjects = async () => {
    try {
      const [employeesResponse, projectsResponse] = await Promise.all([
        axios.get("http://localhost:8085/employees"),
        axios.get("http://localhost:8085/projects")
      ]);

      const allEmployees = employeesResponse.data;
      const allProjects = projectsResponse.data;

      // Process projects to associate employees with their tasks and projects
      const projectEmployees = processProjects(allProjects);

      // Merge employees data with project associations
      const mergedEmployees = allEmployees.map(employee => {
        const projectEmployee = projectEmployees.find(projEmp => projEmp.id === employee.id);
        return projectEmployee ? projectEmployee : { ...employee, projectName: "No Project", tasks: "No Tasks Assigned" };
      });

      setProjects(allProjects);
      setEmployees(mergedEmployees);
    } catch (error) {
      console.error("Failed to load employees and projects:", error);
    }
  };

  return (
    <div className="container">
      <EmployeeTable employees={employees} setEmployees={setEmployees} />
    </div>
  );
};
export default EmployeePage;

