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
  const [project, setProject] = useState({
    name: '',
    status: '',
    startDate: '',
    finishDate: '',
    budget: '',
    description: "",
    employees: [],
    taches: []
  });
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
  const addEmployeeToProject = async (employee) => {
    try {
      const updatedEmployee = {
        ...employee,
        projectId: id,
      };
      await axios.put(`http://localhost:8085/employees/${employee.id}`, updatedEmployee);
      setProject((prev) => ({
        ...prev,
        employees: [...prev.employees, updatedEmployee]
      }));
    } catch (error) {
      console.error("Failed to add employee to project:", error);
      alert("Failed to add employee to project. Please try again.");
    }
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

  const addNewTask = async (taskData) => {
    try {
        const newTask = {
            ...taskData,
            projectId: id 
        };

        const response = await axios.post("http://localhost:8085/taches", newTask);
        if (response.status === 201) { // Check if the task was created successfully
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

  return (
    <div className="container">
      <div className="form-box p-5">
        <form onSubmit={handleSubmit}>
          <div className="flex-container">
            <InputField label="Project Name:" name="name" value={project.name} onChange={handleChange} required />
            <SelectField label="Status:" name="status" value={project.status} options={["On Going", "Not Started", "Finished"]} onChange={handleChange} required />
          </div>
          <div className="flex-container">
          <InputField label="Start Date:" name="startDate" type="date" value={project.startDate} onChange={handleChange} required />
          <InputField label="Finish Date:" name="finishDate" type="date" value={project.finishDate} onChange={handleChange} required />
          <InputField label="Budget:" name="budget" type="number" value={project.budget} onChange={handleChange} required />
          </div>
          
          
          <TextAreaField label="Description:" name="description" value={project.description} onChange={handleChange} required />
          <EmployeeList employees={project.employees} onAddClick={() => setEmployeeModalOpen(true)} randomColor={getRandomCommonColorGrey} />
          <TaskList tasks={project.taches} onDeleteTask={handleDeleteTask} onAddTask={() => setTaskModalOpen(true)} randomColor={getRandomCommonColorGreen} />
          <FormActions />
        </form>
      </div>
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} onSave={addNewTask} />
      <EmployeeModal isOpen={isEmployeeModalOpen} onClose={() => setEmployeeModalOpen(false)} employees={allEmployees} addEmployee={addEmployeeToProject} />
    </div>
  );
}

function InputField({ label, name, value, onChange, type = 'text', required }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input type={type} className="form-control" name={name} value={value} onChange={onChange} required={required} />
    </div>
  );
}

function SelectField({ label, name, value, options, onChange, required }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select name={name} className="form-control" value={value} onChange={onChange} required={required}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, required }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <textarea className="form-control" name={name} value={value} onChange={onChange} rows="4" required={required}></textarea>
    </div>
  );
}

function EmployeeList({ employees, onAddClick, randomColor }) {
  return (
    <div className="form-group">
      <label className="form-label">Collaborateurs:</label>
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
      <label className="form-label">Tâches:</label>
      <div className="form-control my-2">
        {tasks.map((task) => (
          <div key={task.id} className="tag my-3" style={{ backgroundColor: randomColor() }}>
            {task.name}
            <button type="button" onClick={() => onDeleteTask(task.id)} className="icon-button"><i className="fa-sharp fa-solid fa-circle-xmark"></i></button>
          </div>
        ))}
        <button type="button" onClick={onAddTask} className="icon-button"><i className="fas fa-circle-plus"></i> Ajouter une tâche</button>
      </div>
    </div>
  );
}

function FormActions() {
  return (
    <div className="form-actions my-3">
      <button type="submit" className="btn  btn-orange-primary-edit px-3">Enregistrer les changements </button>
      <Link to="/projects" className="btn  btn-orange-outline mx-4">Annuler</Link>
    </div>
  );
}

