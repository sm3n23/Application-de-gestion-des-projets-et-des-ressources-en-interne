import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ProjectsTable from "./ProjectsTable";
import { useNavigate, Link } from "react-router-dom";
import "./project.css";
import { AuthContext } from "../../context/AuthContext";
import Pagination from "../Employees/Pagination";

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
    loadProjects();
  }, []);

  const processProjects = (projects) => {
    return projects.map((project) => {
      const employees = project.employees ? project.employees : [];
      const tasks = project.taches ? project.taches.map((task) => task.name) : [];
      return {
        ...project,
        employees,
        tasks,
      };
    });
  };
  

  const loadProjects = async () => {
    try {
      if (!AuthenticatedEmployee) {
        throw new Error("AuthenticatedEmployee is null");
      }
  
      console.log("AuthenticatedEmployee:", AuthenticatedEmployee);
  
      const result = await axios.get(`http://localhost:8085/allprojects`);
      let sortedProjects = result.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      sortedProjects = processProjects(sortedProjects);
  
      console.log("Projects before filtering:", sortedProjects);
  
      // Filter projects for "Collaborateur" role
      if (AuthenticatedEmployee.role === "Collaborateur") {
        sortedProjects = sortedProjects.filter(project => {
          console.log(`Checking project ${project.name} with employees:`, project.employees);
          
          // Check the structure of each employee object
          project.employees.forEach(emp => {
            console.log(`Checking employee:`, emp.id);
          });
  
          // Log AuthenticatedEmployee details
          console.log("AuthenticatedEmployee ID:", AuthenticatedEmployee.id);
  
          // Apply the filtering condition
          return project.employees.some(emp => emp.id === AuthenticatedEmployee.id);
        });
      }
  
      console.log("Projects after filtering for Collaborateur:", sortedProjects);
  
      setProjects(sortedProjects);
    } catch (error) {
      console.error("Failed to load projects:", error);
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
    const totalAdvancement = taches.reduce(
      (acc, tache) => acc + (tache.advancement || 0),
      0
    );
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
    <div className="container">
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
                      className={`btn  btn-orange-outline-home mx-1 ${
                        statusFilter === "" ? "active" : ""
                      }`}
                      onClick={() => handleStatusChange("")}
                    >
                      Projets
                    </button>
                    <button
                      className={`btn  btn-orange-outline-home mx-1 ${
                        statusFilter === "Prévu" ? "active" : ""
                      }`}
                      onClick={() => handleStatusChange("Prévu")}
                    >
                      Prévu
                    </button>
                    <button
                      className={`btn  btn-orange-outline-home mx-1 ${
                        statusFilter === "En cours" ? "active" : ""
                      }`}
                      onClick={() => handleStatusChange("En cours")}
                    >
                      En cours
                    </button>
                    <button
                      className={`btn  btn-orange-outline-home mx-1 ${
                        statusFilter === "Fini" ? "active" : ""
                      }`}
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

      {AuthenticatedEmployee &&
        AuthenticatedEmployee.role === "ChefDeProjet" && (
          <div className="d-flex justify-content-end">
            <Link to="/projects" className="btn btn-primary btn-orange mx-3">
              Mes Projets
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
