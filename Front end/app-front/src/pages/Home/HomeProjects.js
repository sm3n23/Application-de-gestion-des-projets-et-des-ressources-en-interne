import React, { useState } from "react";
import "../Projects/project.css";
import { Link } from "react-router-dom";
import Modal from "../Projects/Modal";
import axios from "axios";
import Pagination from "../Employees/Pagination";

const ProjectTable = ({ projects, setProjects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="table-container mx-0">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="p-4">Projet</th>
              <th className="p-4">Date debut</th>
              <th className="p-4">Date fin</th>
              <th className="p-4">Status</th>
              <th className="p-4">Budget</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentProjects) && currentProjects.length > 0 ? (
              currentProjects.map((project) => (
                <tr key={project.id}>
                  <td className="p-4 name-column">
                    <strong>{project.name}</strong>
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
                      style={{
                        backgroundColor:
                          project.status === "ON GOING"
                            ? "rgb(249, 119, 20)"
                            : project.status === "PLANNED"
                            ? "rgb(126, 98, 86)"
                            : "rgb(154, 154, 154)",
                      }}
                    ></span>{" "}
                    {project.status}
                  </td>
                  <td className="p-4">
                    {project.budget} MAD
                  </td>
                </tr>
              ))
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