import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const [projects, setProjects] = useState([]);
  const query = useQuery();
  const searchName = query.get("name");
  console.log(searchName);

  useEffect(() => {
    loadProjects();
  }, [searchName]);

  const loadProjects = async () => {
    const result = await axios.get(
      `http://localhost:8085/projects/search?name=${searchName}`
    );
    const processedProjects = processProjects(result.data);
    setProjects(processedProjects);
  };

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:8085/projects/${id}`);
    loadProjects();
  };

  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  };
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
  return (
    <div className="container">
      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Email</th>
              <th>Country</th>
              <th>Signup time</th>
              <th>Affiliate</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Balance, EUR</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>Germany</td>
                <td>May 14, 2020, 12:45:57</td>
                <td>
                  {project.employees.map((employee, index) => (
                    <span
                      key={index}
                      className="tag"
                      style={{ backgroundColor: randomColor() }}
                    >
                      {employee}
                    </span>
                  ))}
                </td>
                <td>
                  <span
                    className="status-circle"
                    style={{
                      backgroundColor:
                        project.status === "On Going"
                          ? "green"
                          : project.status === "Not Started"
                          ? "red"
                          : "orange",
                    }}
                  ></span>{" "}
                  {project.status}
                </td>
                <td>
                  {project.tasks.map((task, index) => (
                    <span
                      key={index}
                      className="tag"
                      style={{ backgroundColor: randomColor() }}
                    >
                      {task}
                    </span>
                  ))}
                </td>
                <td>23,400</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
