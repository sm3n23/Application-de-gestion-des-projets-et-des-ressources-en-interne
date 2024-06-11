import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import ProjectsTable from './ProjectsTable';
import { useNavigate, Link } from 'react-router-dom';
import './project.css';
import { AuthContext } from '../../context/AuthContext';
import EmployeeProjectsTable from './EmployeeProjectsTable';

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { AuthenticatedEmployee } = useContext(AuthContext);

  useEffect(() => {
    if (AuthenticatedEmployee) {
      loadProjects();
    }
  }, [AuthenticatedEmployee]);

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
      if (!AuthenticatedEmployee) {
        throw new Error('AuthenticatedEmployee is null');
      }
      const result = await axios.get(`http://localhost:8085/projects/?username=${AuthenticatedEmployee.username}`);
      const processedProjects = processProjects(result.data);
      setProjects(processedProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
      // Handle error appropriately, e.g., display a message to the user
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <div className='row'>
        <div className="search-bar">
          <input
            type="text"
            placeholder="recherche"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control my-3"
          />
        </div>
      </div>

      {AuthenticatedEmployee && AuthenticatedEmployee.role === "ChefDeProjet" && (
        <div className="d-flex justify-content-end">
          <Link to="/projects/add" className="btn btn-primary btn-orange mx-3">
            <i className="fas fa-circle-plus"></i> Ajouter Projet
          </Link>
        </div>
      )}
      <EmployeeProjectsTable projects={filteredProjects} setProjects={setProjects} />
    </div>
  );
}
