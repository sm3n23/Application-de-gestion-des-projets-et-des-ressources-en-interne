import React, { useState } from "react";
import "../Projects/project.css";
import { Link } from "react-router-dom";
import Modal from "../Projects/Modal";
import axios from "axios";

const ProjectTable = ({ projects, setProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  

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
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project) => (
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
                          project.status === "On Going"
                            ? "rgb(255, 172, 28)"
                            : project.status === "Not Started"
                            ? "rgb(255, 68, 51)"
                            : "rgb(0, 128, 0)",
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
        
      </div>
    </div>
  );
};

export default ProjectTable;
