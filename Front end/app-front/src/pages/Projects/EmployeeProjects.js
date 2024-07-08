import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './project.css';
import { AuthContext } from '../../context/AuthContext';
import EmployeeProjectsTable from './EmployeeProjectsTable';

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(""); 
  const [statusFilter, setStatusFilter] = useState("");
  const [showDateFilters, setShowDateFilters] = useState(false);
  const { AuthenticatedEmployee } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

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
      const result = await axios.get(`http://localhost:8085/allprojects`); // Fetch all projects
      const sortedProjects = result.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      const processedProjects = processProjects(sortedProjects);

      // Filter projects by createdBy attribute
      const filteredProjects = processedProjects.filter(project => 
        project.createdBy && project.createdBy === AuthenticatedEmployee.username
      );

      setProjects(filteredProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
      // Handle error appropriately, e.g., display a message to the user
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const calculateProjectAdvancement = (taches) => {
    if (!taches || taches.length === 0) {
      return 0;
    }
    const totalAdvancement = taches.reduce((acc, tache) => acc + (tache.advancement || 0), 0);
    return totalAdvancement / taches.length;
  };

  const getProjectStatus = (advancement) => {
    if (advancement === 0) {
      return "Prévu";
    } else if (advancement > 0 && advancement < 100) {
      return "En cours";
    } else if (advancement === 100) {
      return "Fini";
    }
    return "Unknown";
  };

  const filteredProjects = projects.filter((project) => {
    const isInDateRange =
      !startDate ||
      !endDate ||
      (project.startDate >= startDate && project.startDate <= endDate);
    const advancement = calculateProjectAdvancement(project.taches);
    const status = getProjectStatus(advancement);
    const matchesStatus = !statusFilter || status === statusFilter;
    return (
      project.name &&
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      isInDateRange &&
      matchesStatus
    );
  });

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <div className="row">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Recherche"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control my-3"
          />
          <div className="dropdown my-3">
            <button
              className="btn btn-sm btn-orange-primary-table"
              onClick={() => setShowDateFilters(!showDateFilters)}
            >
              <i className="fa-solid fa-filter"></i>
            </button>
            <div
              className={`dropdown-content ${showDateFilters ? "show" : ""}`}
            >
              <div className="container">
                <div className="flex-container my-3">
                  <label htmlFor="startDate">Date Debut:</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="form-control"
                  />
                  <label htmlFor="endDate">Date Fin:</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="form-control"
                  />
                </div>
                <div className="flex-container">
                  <div className="button-group my-3">
                    <button
                      className={`btn  btn-orange-outline mx-1 ${statusFilter === "" ? "active" : ""}`}
                      onClick={() => handleStatusChange("")}
                    >
                      Projets
                    </button>
                    <button
                      className={`btn  btn-orange-outline mx-1 ${statusFilter === "Prévu" ? "active" : ""}`}
                      onClick={() => handleStatusChange("Prévu")}
                    >
                      Prévu
                    </button>
                    <button
                      className={`btn  btn-orange-outline mx-1 ${statusFilter === "En cours" ? "active" : ""}`}
                      onClick={() => handleStatusChange("En cours")}
                    >
                      En cours
                    </button>
                    <button
                      className={`btn  btn-orange-outline mx-1 ${statusFilter === "Fini" ? "active" : ""}`}
                      onClick={() => handleStatusChange("Fini")}
                    >
                      Fini
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {AuthenticatedEmployee && AuthenticatedEmployee.role === "ChefDeProjet" && (
        <div className="d-flex justify-content-end">
          <Link to="/projects/add" className="btn btn-primary btn-orange mx-3">
            <i className="fas fa-circle-plus"></i> Ajouter Projet
          </Link>
        </div>
      )}
      <EmployeeProjectsTable projects={currentProjects} setProjects={setProjects} />
    </div>
  );
}
