import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PieChart from "./PieChart"; 
import EmployeeList from "./employeeList";
import HomeProject from "./HomeProjects";
import "./Home.css"
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [projectStatusData, setProjectStatusData] = useState([]); 
  const [employees, setEmployees] = useState([]);
  const { AuthenticatedEmployee } = useContext(AuthContext);

  useEffect(() => {
    if (AuthenticatedEmployee) {
      loadProjects();
      loadEmployees();
    } else {
      console.error("AuthenticatedEmployee is null");
    }
  }, [AuthenticatedEmployee]);

  const processProjects = (projects) => {
    return projects.map(project => {
      const employees = project.employees ? project.employees : [];
      const tasks = project.taches ? project.taches.map(task => task.name) : [];
      return {
        ...project,
        employees,
        tasks
      };
    });
  };

  const loadProjects = async () => {
    try {
      console.log("AuthenticatedEmployee:", AuthenticatedEmployee);
  
      const result = await axios.get("http://localhost:8085/allprojects");
      console.log("Fetched projects:", result.data);

      let sortedProjects = result.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      sortedProjects = processProjects(sortedProjects);
      console.log("Processed projects:", sortedProjects);

      // Filter projects for "Collaborateur" role
      if (AuthenticatedEmployee.role === "Collaborateur") {
        sortedProjects = sortedProjects.filter(project => {
          return project.employees.some(emp => emp.id === AuthenticatedEmployee.id);
        });
        console.log("Filtered projects for Collaborateur:", sortedProjects);
      }
  
      setProjects(sortedProjects);
  
      const statusCounts = {
        "Prévu": 0,
        "En cours": 0,
        "Fini": 0,
      };
  
      sortedProjects.forEach((project) => {
        if (project.status) {
          statusCounts[project.status] =
            (statusCounts[project.status] || 0) + 1;
        }
      });
  
      setProjectStatusData([
        statusCounts["Prévu"], 
        statusCounts["En cours"], 
        statusCounts["Fini"],
      ]);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8085/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="container m-2">
      <div className="py-4">
        <div className="home-container">
          {projects.length > 0 ? (
            <HomeProject projects={projects} setProjects={setProjects}/>
          ) : (
            <p>No projects available.</p>
          )}
        </div>
        <div className="row">
          <div className=" col-lg-6 col-md-6  my-3 px-3 mx-4 PieChart-container">
            <PieChart projectData={projectStatusData} />
          </div>
          <div className="col-lg-6 col-md-6 px-3  my-3  emloyees-container">
            <EmployeeList employees={employees} />
          </div>
        </div>
      </div>
    </div>
  );
}
