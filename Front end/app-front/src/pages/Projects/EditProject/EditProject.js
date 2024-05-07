import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditProject.css";
import TaskModal from "./TaskModal";
import EmployeeModal from "./EmployeeModal";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({ employees: [], taches: [] });
  const [allEmployees, setAllEmployees] = useState([]);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);

  useEffect(() => {
    loadEmployees();
    loadProject();
  }, [id]); // Ensure useEffect correctly listens to changes in `id`

  const loadProject = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error loading project:", error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8085/employees");
      setAllEmployees(response.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  // Single change handler for all inputs
  const handleChange = ({ target: { name, value } }) => {
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  // Add new employee to project
  const addEmployeeToProject = (employee) => {
    setProject((prev) => ({
      ...prev,
      employees: [...prev.employees, employee]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8085/projects/${id}`, project);
      navigate("/projects");
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("Failed to update project. Please try again.");
    }
  };

  const addNewTask = async (taskName) => {
    try {
        const newTask = {
            name: taskName,
            projectId: id // Assuming 'id' is the project ID from useParams()
        };

        const response = await axios.post("http://localhost:8085/taches", newTask);
        if (response.status === 201) { // Check if the task was created successfully
            console.log("Task created successfully:", response.data);
            setProject(prev => ({
                ...prev,
                taches: [...prev.taches, response.data] // Add the new task to the current list
            }));
        } else {
            console.error("Failed to create task:", response);
            alert("Failed to create task. Please try again.");
        }
    } catch (error) {
        console.error("Error creating task:", error);
        alert("Failed to create task. Please try again.");
    }
};


  // Delete task by ID
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:8085/taches/${taskId}`);
      if (response.status === 200) {
        setProject((prev) => ({
          ...prev,
          taches: prev.taches.filter((tache) => tache.id !== taskId),
        }));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task.");
    }
  };

  // Generate random color for tags
  const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <InputField label="Project Name:" name="name" value={project.name} onChange={handleChange} />
        <SelectField label="Status:" name="status" value={project.status} options={["On Going", "Not Started", "Finished"]} onChange={handleChange} />
        <EmployeeList employees={project.employees} onAddClick={() => setEmployeeModalOpen(true)} randomColor={randomColor} />
        <TaskList tasks={project.taches} onDeleteTask={handleDeleteTask} onAddTask={() => setTaskModalOpen(true)} randomColor={randomColor} />
        <FormActions />
      </form>
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} onSave={addNewTask} />
      <EmployeeModal isOpen={isEmployeeModalOpen} onClose={() => setEmployeeModalOpen(false)} employees={allEmployees} addEmployee={addEmployeeToProject} />
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input type="text" className="form-control" name={name} value={value} onChange={onChange} />
    </div>
  );
}

function SelectField({ label, name, value, options, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select name={name} className="form-control" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function EmployeeList({ employees, onAddClick, randomColor }) {
  return (
    <div className="form-group">
      <label className="form-label">Employees:</label>
      <div className="form-control my-2">
        {employees.map((employee) => (
          <div key={employee.id} className="tag my-3" style={{ backgroundColor: randomColor() }}>{employee.name}</div>
        ))}
        <button type="button" onClick={onAddClick} className="icon-button"><i className="fas fa-circle-plus"></i> Ajouter un(e) Collaborateur</button>
      </div>
    </div>
  );
}

function TaskList({ tasks, onDeleteTask, onAddTask, randomColor }) {
  return (
    <div className="form-group">
      <label className="form-label">Tasks:</label>
      <div className="form-control my-2">
        {tasks.map((task) => (
          <div key={task.id} className="tag my-3" style={{ backgroundColor: randomColor() }}>
            {task.name}
            <button type="button" onClick={() => onDeleteTask(task.id)} className="icon-button"><i className="fa-sharp fa-solid fa-circle-xmark"></i></button>
          </div>
        ))}
        <button type="button" onClick={onAddTask} className="icon-button"><i className="fas fa-circle-plus"></i> Ajouter une tache</button>
      </div>
    </div>
  );
}

function FormActions() {
  return (
    <div className="form-actions my-3">
      <button type="submit" className="btn btn-primary m-3">Save Changes</button>
      <Link to="/projects" className="btn btn-danger">Cancel</Link>
    </div>
  );
}
