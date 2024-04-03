import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
  let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    
  });

  const [projects, setProjects] = useState([]);

  const [selectedProjects, setSelectedProjects] = useState([]);

  const { id } = useParams();

  const { name} = employee;

  

  useEffect(() => {
    loadProjects();
    loadEmployee();
  },[]);

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onProjectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setSelectedProjects(selectedOptions);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = {
      ...employee,
      projectIds: selectedProjects  // This should correspond to your backend's expected payload
    };
    await axios.put(`http://localhost:8085/employee/${id}`, updatedEmployee);
    navigate("/");
  };

  const loadProjects = async () => {
    const result = await axios.get(`http://localhost:8085/projects`);
    setProjects(result.data);
  };

  const loadEmployee = async () => {
    const result = await axios.get(`http://localhost:8085/employees/${id}`);
    setEmployee(result.data);
    const projectIds = result.data.projects ? result.data.projects.map((project) => project.id) : [];
    setSelectedProjects(projectIds)
    console.log(projectIds)
    console.log(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit employee</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="from-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary m-3">
              Submit
            </button>
            <Link className="btn btn-outline-danger m-3" to="/">
              Cancel
            </Link>
            <select
  multiple
  className="form-control"
  name="projects"
  value={selectedProjects}
  onChange={onProjectChange}
>
  {projects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.name}
    </option>
  ))}
</select>

          </form>
        </div>
      </div>
    </div>
  );
}
