import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PieChart from "./PieChart"; 
import EmployeeList from "./employeeList";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [projectStatusData, setProjectStatusData] = useState([]); 
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadProjects();
    loadEmployees();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await axios.get("http://localhost:8085/projects");
      setProjects(result.data);

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

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:8085/projects/${id}`);
    loadProjects();
  };

  return (
    <div className="container m-2">
      <div className="py-4">
        <div className="">
          <div className="table-container">
            <table class="table border shadow">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Start Date </th>
                  <th scope="col">finish Date </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{project.name}</td>
                    <td> {project.startDate}</td>
                    <td>{project.finishDate}</td>
                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewemployee/${project.id}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/editemployee/${project.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteProject(project.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row my-5">
          
          <div className=" col-lg-6 col-md-6 px-3">
            <PieChart projectData={projectStatusData} />
          </div>
          <div className="col-lg-6 col-md-6 px-3">
            <EmployeeList employees={employees} />
          </div>
        </div>
      </div>
    </div>
  );
}
