import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PieChart from "./PieChart"; 
import EmployeeList from "./employeeList";
import HomeProject from "./HomeProjects";
import "./Home.css"

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [projectStatusData, setProjectStatusData] = useState([]); 
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadProjects();
    loadEmployees();
  }, []);

  const processProjects = (projects) => {
    return projects.map(project => {
      const employees = project.employees ? project.employees.map(emp => emp.name) : [];
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
      const result = await axios.get("http://localhost:8085/allprojects");
      const processedProjects = processProjects(result.data);
      setProjects(processedProjects);

      const statusCounts = {
        "PLANNED": 0,
        "ON GOING": 0,
        "COMPLETED": 0,
      };

      result.data.forEach((project) => {
        if (project.status) {
          statusCounts[project.status] =
            (statusCounts[project.status] || 0) + 1;
        }
      });

      setProjectStatusData([
        statusCounts["PLANNED"], 
        statusCounts["ON GOING"], 
        statusCounts["COMPLETED"],
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
          <HomeProject projects={projects} setProjects={setProjects}/>
          
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
