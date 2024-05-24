import React, { useState } from "react";
import "./project.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";

const ProjectTable = ({ projects, setProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  

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

  const handleTaskClick = (taskName) => {
    setSelectedTask(taskName);
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
      <div className="table-container ">
        <table className="table  table-hover ">
          <thead className="">
            <tr>
              <th className="p-4">Name</th>
              
              
              <th className="p-4">Collaborateur</th>
              <th className="p-4">Status</th>
              <th className="p-4">Taches</th>
              
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id}>
                  <td className="p-4"> <strong>{project.name}</strong> </td>
                  
                  <td className="p-4">
                    <Link to="/employees/1">
                      {Array.isArray(project.employees) &&
                      project.employees.length > 0 ? (
                        project.employees.map((employee) => (
                          <span
                            key={employee.id}
                            className="tag"
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
                    </Link>
                  </td>
                  <td className="p-4">
                    <span
                      className="status-circle"
                      style={{
                        backgroundColor:
                          project.status === "On Going"
                            ? "green"
                            : project.status === "Not Started"
                            ? "red"
                            : "orange",
                      }}
                    ></span>{" "}
                    {project.status}
                  </td>
                  <td className="p-4">
                    
                    {Array.isArray(project.tasks) &&
                    project.tasks.length > 0 ? (
                      project.tasks.map((task, index) => (
                        <span
                          key={index}
                          className="tag"
                          style={{
                            backgroundColor: getRandomCommonColorGreen(),
                          }}
                          onClick={() => handleTaskClick(task)}
                        >
                          {task}
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
                  
                  <td className="p-4 ">
                  
                    <Link
                      className="btn btn-sm  btn-orange-outline mx-4"
                      to={`/projects/edit/${project.id}`}
                    >
                      Edit
                    </Link>
                    <button 
                      className="btn btn-sm btn-orange-primary px-3"
                      onClick={() => deleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No projects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="task-details">
            <h4>Task Details :</h4>
            <p>{selectedTask}</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProjectTable;
