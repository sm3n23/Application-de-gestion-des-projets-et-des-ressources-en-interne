import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./EditEmployee.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TaskModal from "./TaskModal"; // Adjust the path as necessary
import { AuthContext } from "../../../context/AuthContext";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { AuthenticatedEmployee } = useContext(AuthContext);

  useEffect(() => {
    if (location.state && location.state.projectId) {
      loadProject(location.state.projectId);
    }
    loadEmployeeTasks();
  }, [location.state]);

  const loadProject = async (projectId) => {
    try {
      const response = await axios.get(
        `http://localhost:8085/projects/${projectId}`
      );
      setProject(response.data);
      setTasks(response.data.taches || []);
    } catch (error) {
      console.error("Error loading project:", error);
    }
  };

  const loadEmployeeTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/employees/${id}`);
      const allTasks = response.data.taches || [];
      setEmployeeTasks(allTasks);
    } catch (error) {
      console.error("Error loading employee tasks:", error);
    }
  };

  const handleTaskSelection = (task) => {
    setEmployeeTasks((prev) => {
      return prev.some((t) => t.id === task.id)
        ? prev.filter((t) => t.id !== task.id)
        : [...prev, task];
    });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskIds = employeeTasks.map((task) => task.id);
    try {
      await axios.put(`http://localhost:8085/employees/${id}/tasks`, taskIds);
      navigate("/projects");
    } catch (error) {
      console.error("Failed to save changes:", error.response.data);
      alert("Failed to update employee. Please try again.");
    }
  };

  const greyColors = ["#808080"];
  const greenColors = ["#008000", "#228B22", "#4F7942"];

  const getRandomCommonColorGrey = () => {
    const randomIndex = Math.floor(Math.random() * greyColors.length);
    return greyColors[randomIndex];
  };

  const getRandomCommonColorGreen = () => {
    const randomIndex = Math.floor(Math.random() * greenColors.length);
    return greenColors[randomIndex];
  };

  // Filter tasks to only include those that belong to the current project
  const employeeProjectTasks = employeeTasks.filter((task) =>
    tasks.some((projTask) => projTask.id === task.id)
  );

  return (
    <div className="container">
      <div className="form-box p-5">
        <form onSubmit={handleSubmit}>
          {project && (
            <div className="form-group m-1">
              <label className="form-label">Projet:</label>
              <input
                type="text"
                className="form-control"
                value={project.name}
                readOnly
              />
            </div>
          )}
          {tasks.length > 0 && (
            <TaskList
              AuthenticatedEmployee={AuthenticatedEmployee}
              tasks={tasks}
              selectedTaskIds={new Set(employeeTasks.map((t) => t.id))}
              onTaskSelection={handleTaskSelection}
              getRandomCommonColorGreen={getRandomCommonColorGreen}
            />
          )}
          <div className="form-group">
            <label className="form-label">Tâches de collaborateur:</label>
            <div className="form-control my-2">
              {Array.isArray(employeeProjectTasks) &&
              employeeProjectTasks.length > 0 ? (
                employeeProjectTasks.map((task) => (
                  <div
                    key={task.id}
                    className="tag my-3"
                    style={{ backgroundColor: getRandomCommonColorGrey() }}
                  >
                    <span onClick={() => handleTaskClick(task)}>
                      {task.name}{" "}
                      {AuthenticatedEmployee &&
                        AuthenticatedEmployee.role === "Collaborateur" && (
                          <i className="fa-solid fa-pen-to-square icon-button"></i>
                        )}
                    </span>
                    {AuthenticatedEmployee &&
                      AuthenticatedEmployee.role === "ChefDeProjet" && (
                        <button
                          type="button"
                          onClick={() => handleTaskSelection(task)}
                          className="icon-button"
                        >
                          <i className="fas fa-minus-circle"></i>
                        </button>
                      )}
                  </div>
                ))
              ) : (
                <span className="text-center">aucune tâche assignée.</span>
              )}
            </div>
          </div>
          <div className="form-actions my-3 mx-1">
          {AuthenticatedEmployee &&
                      AuthenticatedEmployee.role === "ChefDeProjet" && (
                        <button type="submit" className="btn btn-orange-primary-edit px-3 mx-4">
              Enregistrer les changements
            </button>
                      )}
            
            <Link to="/allprojects" className="btn btn-orange-outline ">
              Annuler
            </Link>
          </div>
        </form>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleTaskSelection}
      />
    </div>
  );
}

function TaskList({
  tasks,
  selectedTaskIds,
  onTaskSelection,
  getRandomCommonColorGreen,
  AuthenticatedEmployee,
}) {
  return (
    <div className="form-group m-1 my-2">
      <label className="form-label">Tâches de projet:</label>
      <div className="form-control my-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="tag my-3"
            style={{ backgroundColor: getRandomCommonColorGreen() }}
          >
            {task.name}
            {AuthenticatedEmployee &&
              AuthenticatedEmployee.role === "ChefDeProjet" && (
                <button
                  type="button"
                  onClick={() => onTaskSelection(task)}
                  className="icon-button"
                >
                  {selectedTaskIds.has(task.id) ? (
                    <i className="fas fa-check-circle"></i>
                  ) : (
                    <i className="fas fa-plus-circle"></i>
                  )}
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FormActions() {
  return (
    <div className="form-actions my-3 mx-1">
      <button type="submit" className="btn btn-orange-primary-edit px-3">
        Enregistrer les changements
      </button>
      <Link to="/allprojects" className="btn btn-orange-outline mx-4">
        Annuler
      </Link>
    </div>
  );
}
