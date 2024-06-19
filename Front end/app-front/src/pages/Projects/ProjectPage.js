import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import ProjectsTable from './ProjectsTable';
import { useNavigate, Link } from 'react-router-dom';
import './project.css';
import { AuthContext } from '../../context/AuthContext';
import Pagination from '../Employees/Pagination';

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { AuthenticatedEmployee } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  useEffect(() => {
    loadProjects();
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
      if (!AuthenticatedEmployee) {
        throw new Error('AuthenticatedEmployee is null');
      }
      const result = await axios.get(`http://localhost:8085/allprojects`);
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
    project.name && project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <Link to="/projects" className="btn btn-primary btn-orange mx-3">
            Mes Projets
          </Link>
        </div>
      )}
      {AuthenticatedEmployee && AuthenticatedEmployee.role === "Collaborateur" && (
        <div className="d-flex justify-content-end">
          <Link to={`/collaborateur/edit/${AuthenticatedEmployee.id}`} className="btn btn-primary btn-orange mx-3">
            Mes Taches
          </Link>
        </div>
      )}
      <ProjectsTable projects={currentProjects} setProjects={setProjects} />
      <Pagination
        itemsPerPage={projectsPerPage}
        totalItems={filteredProjects.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
