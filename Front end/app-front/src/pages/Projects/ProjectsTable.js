import React, { useContext, useState } from "react";
import "./project.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';

const ProjectTable = ({ projects, setProjects }) => {
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
    try {
      await axios.delete(`http://localhost:8085/projects/${projectId}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="table-container mx-0">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="p-4">Projet</th>
              <th className="p-4">Collaborateur</th>
              <th className="p-4">Status</th>
              <th className="p-4">Taches</th>
              
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
                          {"No employees Assigned"}
                        </span>
                      )}
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
                  <td className="p-4 tache-column">
                    {Array.isArray(project.taches) &&
                    project.taches.length > 0 ? (
                      project.taches.map((task) => (
                        <span
                          key={task.id}
                          className="tag  m-1"
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
                        {"No Tasks created"}
                      </span>
                    )}
                  </td>
                  
                </tr>
              ))
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
                <button className="modal-close-button" onClick={()=>setIsModalOpen(false)}><i className=" fa-sharp fa-solid fa-circle-xmark"></i></button>
                <h4 className="">Task Details:</h4>
                <div className="form-box-modal">
                  <div className="flex-container">
                    <div className="form-group">
                      <label className="form-label" for="name">
                        Task Name:
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        value={selectedTask.name}
                        disabled
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-container my-2">
                    <div className="form-group">
                      <label className="form-label" for="name">
                        Description :
                      </label>
                      <textarea
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        value={selectedTask.description}
                        disabled
                        rows={4}
                        
                      />
                    </div>
                  </div>
                  <div className="flex-container my-3">
                            <div className="form-group">
                                <label className="form-label" for="startDate">Start Date:</label>
                                <input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    className="form-control"
                                    value={selectedTask.startDate}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="finishDate">Finish Date:</label>
                                <input
                                    id="finishDate"
                                    name="finishDate"
                                    type="date"
                                    className="form-control"
                                    value={selectedTask.finishDate}
                                    disabled
                                />
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

export default ProjectTable;
