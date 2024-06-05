import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditEmployee.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { WithContext as ReactTags } from "react-tag-input";
import TaskModal from "./TaskModal"; // Adjust the path as necessary

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    title: "",
    skills: [],
    description: "",
    birthDate: "",
    experience: "",
    phoneNumber: "",
    email: "",
    location: "",
    picture:"",
    projectId: null,
    project: null,
    tachesIds: [],
    employeeTasks: [], // New field for employee's tasks
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [section, setSection] = useState("details");

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/employees/${id}`);
      console.log(response.data)
      const {
        name,
        title,
        skills,
        description,
        birthDate,
        experience,
        phoneNumber,
        email,
        location,
        picture,
        project,
        taches,
      } = response.data;
      setEmployee({
        name,
        title,
        skills: skills ? skills : [], // Ensure skills is an array
        description,
        birthDate,
        experience,
        phoneNumber,
        email,
        location,
        picture,
        projectId: project ? project.id : null,
        project: project ? project : null,
        tachesIds: taches ? taches.map((t) => t.id) : [],
        employeeTasks: taches ? taches : [], // Initialize employee's tasks
      });
      if (project && project.id) {
        setTasks(project.taches);
      }
    } catch (error) {
      console.error("Error loading employee:", error);
    }
  };

  

  const handleTaskSelection = (task) => {
    setEmployee((prev) => {
      const employeeTasks = prev.employeeTasks.some((t) => t.id === task.id)
        ? prev.employeeTasks.filter((t) => t.id !== task.id)
        : [...prev.employeeTasks, task];
      return { ...prev, employeeTasks };
    });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...employee,
      tachesIds: employee.employeeTasks.map((task) => task.id), // Update tachesIds with selected employee tasks
    };
    try {
      await axios.put(`http://localhost:8085/employees/${id}`, payload);
      navigate("/collaborateur");
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

  

  return (
    <div className="container">
      <div className="form-box p-5">
        
        <form onSubmit={handleSubmit}>
          
          
              {employee.project && (
                <div className="form-group m-1">
                  <label className="form-label">Projet:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee.project.name}
                    readOnly
                  />
                </div>
              )}
              {tasks.length > 0 && (
                <TaskList
                  tasks={tasks}
                  selectedTaskIds={new Set(employee.tachesIds)}
                  onTaskSelection={handleTaskSelection}
                  getRandomCommonColorGreen={getRandomCommonColorGreen}
                />
              )}
              <div className="form-group">
                <label className="form-label">Tâches de collaborateur:</label>
                <div className="form-control my-2">
                  {employee.employeeTasks.map((task) => (
                    <div
                      key={task.id}
                      className="tag my-3"
                      style={{ backgroundColor: getRandomCommonColorGrey() }}
                      
                    >
                      <span onClick={() => handleTaskClick(task)}>{task.name}</span>
                      <button
                        type="button"
                        onClick={() => handleTaskSelection(task)}
                        className="icon-button"
                      >
                        <i className="fas fa-minus-circle"></i>
                      </button>
                    </div>
                  ))}
                  
                </div>
              </div>
            
          <FormActions />
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



function TaskList({ tasks, selectedTaskIds, onTaskSelection, getRandomCommonColorGreen }) {
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
          </div>
        ))}
      </div>
    </div>
  );
}

function FormActions() {
  return (
    <div className="form-actions my-3 mx-1">
      <button type="submit" className="btn  btn-orange-primary-edit px-3">
        Save Changes
      </button>
      <Link to="/collaborateur" className="btn  btn-orange-outline mx-4">
        Cancel
      </Link>
    </div>
  );
}
