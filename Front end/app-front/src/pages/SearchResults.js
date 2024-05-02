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
  console.log(searchName)

  useEffect(() => {
    loadProjects();
  }, [searchName]);

  const loadProjects = async () => {
    const result = await axios.get(`http://localhost:8085/projects/search?name=${searchName}`);
    setProjects(result.data);
  };

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:8085/projects/${id}`);
    loadProjects();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Projects</h1>
        <table className="table border shadow">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">Finish Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <th scope="row">{index + 1}</th>
                <td>{project.name}</td>
                <td>{project.startDate}</td>
                <td>{project.finishDate}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewproject/${project.id}`}>View</Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editproject/${project.id}`}>Edit</Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteProject(project.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
