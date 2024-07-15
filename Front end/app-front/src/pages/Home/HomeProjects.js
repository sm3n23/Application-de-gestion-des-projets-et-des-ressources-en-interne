import React, { useContext, useState } from "react";
import "../Projects/project.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../Employees/Pagination";
import { AuthContext } from "../../context/AuthContext";

const ProjectTable = ({ projects, setProjects }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { AuthenticatedEmployee } = useContext(AuthContext);

  const projectsPerPage = 5;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const getStatusColor = (status) => {
    if (status === "En cours") {
      return "rgb(249, 119, 20)";
    } else if (status === "Prévu") {
      return "rgb(126, 98, 86)";
    } else if (status === "Fini") {
      return "rgb(154, 154, 154)";
    }
    return "rgb(255, 255, 255)";
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const calculateExpectedAdvancement = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 0;
    if (now > end) return 100;

    const totalTime = end - start;
    const elapsedTime = now - start;

    return (elapsedTime / totalTime) * 100;
  };

  const filteredProjects = projects.filter((project) => {
    const advancement = calculateProjectAdvancement(project.taches);
    const status = getProjectStatus(advancement);
    const matchesStatus = !statusFilter || status === statusFilter;
    return (
      project.name &&
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      matchesStatus
    );
  });

  const getAdvancementStatus = (advancement, expectedAdvancement) => {
    const iconStyle = { fontSize: '24px', marginRight: '8px' }; // Adjust the font size and margin as needed
  
    if (advancement < expectedAdvancement * 0.89) {
      return {
        icon: <i className="fa-solid fa-face-frown sad" style={iconStyle}></i>,
        tooltip: `(Fait: ${advancement.toFixed(2)}%, Attendu: ${expectedAdvancement.toFixed(2)}%)`,
      };
    } else if (advancement >= expectedAdvancement) {
      return {
        icon: <i className="fa-solid fa-face-smile happy" style={iconStyle}></i>,
        tooltip: `(Fait: ${advancement.toFixed(2)}%, Attendu: ${expectedAdvancement.toFixed(2)}%)`,
      };
    } else {
      return {
        icon: <i className="fa-solid fa-face-meh normal" style={iconStyle}></i>,
        tooltip: `(Fait: ${advancement.toFixed(2)}%, Attendu: ${expectedAdvancement.toFixed(2)}%)`,
      };
    }
  };
  
  
  return (
    <div className="container">
      <div className="row">
        <div className="search-bar-home">
          <input
            type="text"
            placeholder="Recherche"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control my-3"
          />
          <div className="button-group my-3">
            <button
              className={`btn  btn-orange-outline-home mx-1  ${statusFilter === "" ? "active" : ""}`}
              onClick={() => handleStatusChange("")}
            >
              Projets
            </button>
            <button
              className={`btn  btn-orange-outline-home  ${statusFilter === "Prévu" ? "active" : ""}`}
              onClick={() => handleStatusChange("Prévu")}
            >
              Prévu
            </button>
            <button
              className={`btn  btn-orange-outline-home mx-1 ${statusFilter === "En cours" ? "active" : ""}`}
              onClick={() => handleStatusChange("En cours")}
            >
              En cours
            </button>
            <button
              className={`btn  btn-orange-outline-home  ${statusFilter === "Fini" ? "active" : ""}`}
              onClick={() => handleStatusChange("Fini")}
            >
              Fini
            </button>
          </div>
        </div>
      </div>
      <div className="table-container mx-0">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="p-4">Projet</th>
              <th className="p-4">Date debut</th>
              <th className="p-4">Date fin</th>
              <th className="p-4">Status</th>
              {AuthenticatedEmployee && AuthenticatedEmployee.role === "ChefDeProjet" &&(
              
              <th className="p-4">Budget</th>
              )}
              <th className="p-4">Avancement</th>
              <th className="p-4">Météo</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredProjects) && filteredProjects.length > 0 ? (
              filteredProjects.map((project) => {
                const advancement = calculateProjectAdvancement(project.taches);
                const status = getProjectStatus(advancement);
                const expectedAdvancement = calculateExpectedAdvancement(project.startDate, project.finishDate);
                const { icon, tooltip } = getAdvancementStatus(advancement, expectedAdvancement);

                return (
                  <tr key={project.id}>
                    <td className="p-4 name-column">
                      <Link
                              className="link"
                              to={`/projects/voir/${project.id}`}
                              
                      >
                              <strong>{project.name}</strong>
                      </Link>
                    </td>
                    <td className="p-4 tache-column">
                      {project.startDate}
                    </td>
                    <td className="p-4 tache-column">
                      {project.finishDate}
                    </td>
                    <td className="p-4">
                      <span
                        className="status-circle"
                        style={{ backgroundColor: getStatusColor(status) }}
                      ></span>{" "}
                      {status}
                    </td>
                    {AuthenticatedEmployee && AuthenticatedEmployee.role === "ChefDeProjet" &&(
                    <td className="p-4">
                      {project.budget} MAD
                    </td>
                    )}
                    
                    <td className="p-4">
                      {advancement.toFixed(2)}%
                    </td>
                    <td className="p-4">
                      <span title={tooltip}>{icon}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Pas des projets disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {projects.length > projectsPerPage && (
          <Pagination
            itemsPerPage={projectsPerPage}
            totalItems={projects.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectTable;
