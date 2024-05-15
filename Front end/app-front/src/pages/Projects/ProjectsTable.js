import React, { useState } from "react";
import "./project.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";

const ProjectTable = ({ projects, setProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  const darkColors = [
    "#8B0000", // Dark Red
    "#006400", // Dark Green
    "#00008B", // Dark Blue
    "#800080", // Dark Purple
    "#FF8C00", // Dark Orange
    "#2F4F4F", // Dark Slate Gray
    "#8B008B", // Dark Magenta
    "#9932CC", // Dark Orchid
    "#8B4513", // Saddle Brown
    "#556B2F", // Dark Olive Green
  ];

  const getRandomCommonColor = () => {
    const randomIndex = Math.floor(Math.random() * darkColors.length);
    return darkColors[randomIndex];
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
      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Signup time</th>
              <th>Collaborateur</th>
              <th>Status</th>
              <th>Taches</th>
              <th>Balance, EUR</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>Germany</td>
                  <td>May 14, 2020, 12:45:57</td>
                  <td>
                    <Link to="/employees/1">
                  {Array.isArray(project.employees)&& project.employees.length > 0 ? project.employees.map((employee)=>(
                                    <span key={employee.id} className="tag" style={{ backgroundColor: getRandomCommonColor() }}>{employee}</span>
                                )): <span className="tag" style={{ backgroundColor: getRandomCommonColor() }}>{"No employees Assigned"}</span>} 
                  </Link></td>
                  <td>
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
                  <td>
                    {Array.isArray(project.tasks)&& project.tasks.length>0
                      ? project.tasks.map((task, index) => (
                          <span
                            key={index}
                            className="tag"
                            style={{ backgroundColor: getRandomCommonColor() }}
                            onClick={() => handleTaskClick(task)}
                          >
                            {task}
                          </span>
                        ))
                      : (
                          <span className="tag" style={{ backgroundColor: getRandomCommonColor() }}>
                            {"No Tasks created"}
                          </span>
                        )}
                  </td>
                  <td>23,255 $</td>
                  <td>
                    <Link
                      className="btn btn-sm btn-outline-info btn-orange-outline  mx-2 px-3"
                      to={`/projects/edit/${project.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
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
            <h4>Task Details</h4>
            <p>{selectedTask}</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProjectTable;
