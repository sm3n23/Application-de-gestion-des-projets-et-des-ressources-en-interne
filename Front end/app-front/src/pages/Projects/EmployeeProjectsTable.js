import React, { useContext, useState } from "react";
import "./project.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const EmployeeProjectsTable = ({ projects, setProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { AuthenticatedEmployee } = useContext(AuthContext);

  const greyColors = ["#A9A9A9", "#808080", "#899499"];
  const greenColors = ["#008000", "#228B22", "#4F7942"];

  const getRandomCommonColorGrey = () => {
    const randomIndex = Math.floor(Math.random() * greyColors.length);
    return greyColors[randomIndex];
  };

  const getRandomCommonColorGreen = () => {
    const randomIndex = Math.floor(Math.random() * greenColors.length);
    return greenColors[randomIndex];
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const deleteProject = async (projectId) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8085/projects/${projectId}`);
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
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
      <div className="table-container mx-0">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="p-4">Projet</th>
              <th className="p-4">CPI</th>
              <th className="p-4">Collaborateur</th>
              <th className="p-4">Status</th>
              <th className="p-4">Taches</th>
              <th className="p-4">Avancement</th>
              <th className="p-4">Météo</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project) => {
                const advancement = calculateProjectAdvancement(project.taches);
                const status = getProjectStatus(advancement);
                const expectedAdvancement = calculateExpectedAdvancement(project.startDate, project.finishDate);
                const { icon, tooltip } = getAdvancementStatus(advancement, expectedAdvancement);
                return (
                  <tr key={project.id}>
                    <td className="p-4 name-column">
                      <strong>{project.name}</strong>
                    </td>
                    <td className="p-4 name-column">
                    <span
                            
                            className="tag m-1 employee-column"
                            style={{
                              backgroundColor: getRandomCommonColorGrey(),
                            }}
                          >
                            {AuthenticatedEmployee.name}
                          </span>
                      
                    </td>
                    <td className="p-4 tache-column">
                      {Array.isArray(project.employees) &&
                      project.employees.length > 0 ? (
                        project.employees.map((employee, index) => (
                          <span
                            key={index}
                            className="tag m-1 employee-column"
                            style={{
                              backgroundColor: getRandomCommonColorGrey(),
                            }}
                          >
                            {employee}
                          </span>
                        ))
                      ) : (
                        <span
                          className="tag"
                          style={{
                            backgroundColor: getRandomCommonColorGrey(),
                          }}
                        >
                          {"Aucun Collaborateur affecté"}
                        </span>
                      )}
                    </td>
                    <td className="p-4" style={{ minWidth: '160px' }}>
                      <span
                        className="status-circle"
                        style={{ backgroundColor: getStatusColor(status) }}
                      ></span>{" "}
                      {status}
                    </td>
                    <td className="p-4 tache-column">
                      {Array.isArray(project.taches) &&
                      project.taches.length > 0 ? (
                        project.taches.map((task) => (
                          <span
                            key={task.id}
                            className="tag m-1"
                            style={{
                              backgroundColor: getRandomCommonColorGreen(),
                            }}
                            onClick={() => handleTaskClick(task)}
                          >
                            {task.name}
                          </span>
                        ))
                      ) : (
                        <span
                          className="tag"
                          style={{ backgroundColor: getRandomCommonColorGreen() }}
                        >
                          {"Aucune tâche créée"}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {advancement.toFixed(2)}%
                    </td>
                    <td className="p-4">
                      <span title={tooltip}>{icon}</span>
                    </td>
                    {AuthenticatedEmployee &&
                      AuthenticatedEmployee.role === "ChefDeProjet" && (
                        <td className="py-4 tache-column" style={{ minWidth: '160px' }}>
                          <Link className="btn-orange-outline-table btn btn-sm m-1" to={`/projects/voir/${project.id}`}>
                            <i className="fa-solid fa-eye"></i>
                          </Link>
                          <Link
                            className="btn btn-sm btn-orange-outline-table m-1"
                            to={`/projects/edit/${project.id}`}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-orange-primary-table"
                            onClick={() => deleteProject(project.id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Pas de projets disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {selectedTask && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="modal-close-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                </button>
                <h4 className="">Détails de la tâche:</h4>
                <div className="form-box-modal">
                <div className="profile-right">
                    <div className="section basic-info row">
                      <div className="info-item mb-4">
                        <p className="col-lg-12">
                          <strong>
                            Tache: <span>{selectedTask.name}</span>
                          </strong>
                        </p>
                        
                      </div>
                      <div className="info-item mb-4">
                        
                        <p className="col-lg-4">
                          <strong>
                          Description{" "}
                            <span>{selectedTask.description}</span>
                          </strong>
                        </p>
                        
                      </div>
                      <div className="info-item mb-4">
                      <p className="col-lg-4">
                          <strong>
                          Date debut <span>{selectedTask.startDate}</span>
                          </strong>
                        </p>
                        <p className="col-lg-4">
                          <strong>
                          Date fin <span>{selectedTask.finishDate}</span>
                          </strong>
                        </p>
                      </div>
                      <div className="info-item mb-4">
                      
                        <p className="col-lg-4">
                          <strong>
                          Avancement  <span>({selectedTask.advancement}%)</span>
                          </strong>
                        </p>
                      </div>
                    </div>
                    
                  </div>
                  <div className="flex-container my-3"></div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default EmployeeProjectsTable;
