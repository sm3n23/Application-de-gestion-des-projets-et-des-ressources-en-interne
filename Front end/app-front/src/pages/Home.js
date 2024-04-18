import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8085/projects");
    console.log(result.data);
    setProjects(result.data);
  };

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:8085/projects/${id}`);
    loadProjects();
  };

  return (
    <div className="container">
      <div className="py-4">
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
            <td> {project.startDate}
            </td>
            <td>{project.finishDate}</td>
            <td>
              <Link className="btn btn-primary mx-2" to={`/viewemployee/${project.id}`}>
                View
              </Link>
              <Link className="btn btn-outline-primary mx-2" to={`/editemployee/${project.id}`}>
                Edit
              </Link>
              <button className="btn btn-danger mx-2" onClick={() => deleteProject(project.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
        </table>
      </div>
    </div>
  );
}
