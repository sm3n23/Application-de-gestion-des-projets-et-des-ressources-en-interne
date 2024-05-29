import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PieChart from "./PieChart"; 
import EmployeeList from "./employeeList";
import ProjectsTable from "../Projects/ProjectsTable";
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
        const employees = project.employees.map(emp => emp.name);
        const tasks = project.taches.map(task => task.name);
        return {
            ...project,
            employees,
            tasks
        };
    });
};

  const loadProjects = async () => {
    try {
      const result = await axios.get("http://localhost:8085/projects");
      const processedProjects = processProjects(result.data);
      setProjects(processedProjects);

      const statusCounts = {
        "Not Started": 0,
        "On Going": 0,
        Finished: 0,
      };

      result.data.forEach((project) => {
        if (project.status) {
          statusCounts[project.status] =
            (statusCounts[project.status] || 0) + 1;
        }
      });

      setProjectStatusData([
        statusCounts["Not Started"], 
        statusCounts["On Going"], 
        statusCounts["Finished"],
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
            <div className='header'>
                <h5 className='header-txt'></h5>
                <Link to="/projects" className="view-all-link">View All</Link>

            </div>
          <ProjectsTable projects={projects} setProjects={setProjects}/>
        </div>
        <div className="row my-3">
          
          <div className=" col-lg-6 col-md-6 px-3 mx-4 PieChart-container">
            
            <PieChart projectData={projectStatusData} />
          </div>
          <div className="col-lg-6 col-md-6 px-3  emloyees-container">
            <EmployeeList employees={employees} />
          </div>
        </div>
      </div>
    </div>
  );
}
