import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import TaskModal from '../EditProject/TaskModal';
import EmployeeModal from '../EditProject/EmployeeModal';
import '../EditProject/EditProject.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthContext } from '../../../context/AuthContext'; // Make sure to import AuthContext

const AddProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: '',
    status: '',
    startDate: '',
    finishDate: '',
    budget: '',
    description: '',
    employees: [],
    taches: []
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);
  const { AuthenticatedEmployee } = useContext(AuthContext); 
  

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8085/employees");
      setAllEmployees(response.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!AuthenticatedEmployee) {
      alert('You need to be logged in to create a project.');
      return;
    }
    try {
      const projectResponse = await axios.post(
        `http://localhost:8085/projects?username=${AuthenticatedEmployee.username}`,
        project
      );
      const newProjectId = projectResponse.data.id;

      await Promise.all(project.taches.map(task => createTaskForProject(task, newProjectId)));

      navigate('/projects');
    } catch (error) {
      console.error('Failed to add project:', error.response || error.message);
      alert('Failed to add project. Please try again.');
    }
  };

  const createTaskForProject = async (task, projectId) => {
    try {
      const newTask = {
        ...task,
        projectId
      };
      await axios.post("http://localhost:8085/taches", newTask);
    } catch (error) {
      console.error(`Failed to create task ${task.name} for project ${projectId}:`, error);
    }
  };

  const addEmployeeToProject = (employee) => {
    setProject((prev) => ({
      ...prev,
      employees: [...prev.employees, employee]
    }));
  };

  const addNewTask = (taskData) => {
    setProject((prev) => ({
      ...prev,
      taches: [...prev.taches, taskData]
    }));
  };

  const handleDeleteTask = (taskId) => {
    setProject((prev) => ({
      ...prev,
      taches: prev.taches.filter((tache) => tache.id !== taskId),
    }));
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
            <InputField required label="Project Name:" name="name" value={project.name} onChange={handleChange} />
            <SelectField required label="Status:" name="status" value={project.status} options={["En cours", "Prévu", "Fini"]} onChange={handleChange} />
          </div>
          <div className="flex-container">
            <InputField required label="Start Date:" name="startDate" type="date" value={project.startDate} onChange={handleChange} />
            <InputField required label="Finish Date:" name="finishDate" type="date" value={project.finishDate} onChange={handleChange} />
            <InputField required label="Budget:" name="budget" type="number" value={project.budget} onChange={handleChange} />
          </div>
          <TextAreaField required label="Description:" name="description" value={project.description} onChange={handleChange} />
          <EmployeeList employees={project.employees} onAddClick={() => setEmployeeModalOpen(true)} randomColor={getRandomCommonColorGrey} />
          <TaskList tasks={project.taches} onDeleteTask={handleDeleteTask} onAddTask={() => setTaskModalOpen(true)} randomColor={getRandomCommonColorGreen} />
          <FormActions />
        </form>
      </div>
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} onSave={addNewTask} />
      <EmployeeModal isOpen={isEmployeeModalOpen} onClose={() => setEmployeeModalOpen(false)} employees={allEmployees} addEmployee={addEmployeeToProject} />
    </div>
  );
};

function InputField({ label, name, value, onChange, type = 'text', required }) {
  return (
    <div className="form-group m-1">
      <label className="form-label">{label}</label>
      <input type={type} className="form-control" name={name} value={value} onChange={onChange} required={required} />
    </div>
  );
}

function SelectField({ label, name, value, options, onChange, required }) {
  return (
    <div className="form-group m-1">
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
    <div className="form-group m-1">
      <label className="form-label">{label}</label>
      <textarea className="form-control" name={name} value={value} onChange={onChange} rows="4" required={required}></textarea>
    </div>
  );
}

function EmployeeList({ employees, onAddClick, randomColor }) {
  return (
    <div className="form-group m-1">
      <label className="form-label">Collaborateurs:</label>
      <div className="form-control my-2">
        {employees.map((employee) => (
          <div key={employee.id} className="tag my-3" style={{ backgroundColor: randomColor() }}>{employee.name}</div>
        ))}
        <button type="button" onClick={onAddClick} className="icon-button"><i className="fas fa-circle-plus"></i> Ajouter Des Collaborateurs</button>
      </div>
    </div>
  );
}

function TaskList({ tasks, onDeleteTask, onAddTask, randomColor }) {
  return (
    <div className="form-group m-1">
      <label className="form-label">Tasks:</label>
      <div className="form-control my-2">
        {tasks.map((task) => (
          <div key={task.id} className="tag my-3" style={{ backgroundColor: randomColor() }}>
            {task.name}
            <button type="button" onClick={() => onDeleteTask(task.id)} className="icon-button"><i className="fa-sharp fa-solid fa-circle-xmark"></i></button>
          </div>
        ))}
        <button type="button" onClick={onAddTask} className="icon-button"><i className="fas fa-circle-plus"></i> Ajouter Des tâches</button>
      </div>
    </div>
  );
}

function FormActions() {
  return (
    <div className="form-actions my-3 mx-1">
      <button type="submit" className="btn  btn-orange-primary-edit px-3">Ajouter projet</button>
      <Link to="/projects" className="btn  btn-orange-outline mx-4">Annuler</Link>
    </div>
  );
}

export default AddProject;
