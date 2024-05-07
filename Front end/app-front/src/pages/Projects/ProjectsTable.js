import React, { useState } from "react";
import "./project.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";


const ProjectTable = ({ projects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  };

  const handleTaskClick = (taskName) => {
    setSelectedTask(taskName);
    setIsModalOpen(true);
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
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>Germany</td>
                <td>May 14, 2020, 12:45:57</td>
                <td>
                  {project.employees.map((employee, index) => (
                    <span
                      key={index}
                      className="tag"
                      style={{ backgroundColor: randomColor() }}
                      
                    >
                      {employee}
                    </span>
                  ))}
                </td>
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
                  {project.tasks.map((task, index) => (
                    <span
                      key={index}
                      className="tag"
                      style={{ backgroundColor: randomColor() }}
                      onClick={() => handleTaskClick(task)}
                    >
                      {task}
                    </span>
                  ))}
                </td>
                <td>
                  23,255
                </td>
                <td>
                  <Link
                    className="btn btn-sm btn-outline-info mx-2 px-3"
                    to={`/projects/edit/${project.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-sm btn-outline-danger "
                    to={`/project/delete/${project.id}`}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
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
