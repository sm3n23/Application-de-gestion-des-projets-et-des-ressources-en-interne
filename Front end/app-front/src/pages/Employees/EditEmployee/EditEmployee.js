import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditEmployee.css";
import TaskModal from "./TaskModal";
import ProjectModal from "./ProjectModal";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employee, setEmployee] = useState({ name: '', projectId: new Set(), tachesIds: new Set() });
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    loadProjects();
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/employees/${id}`);
      const { name, projectId, role, tachesIds } = response.data;
      setEmployee({ name, projectId: new Set(projectId), tachesIds: new Set(tachesIds) });
    } catch (error) {
      console.error("Error loading employee:", error);
    }
  };
  

  const loadProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:8085/projects`);
      setProjects(res.data);
    } catch (error) {
      console.error("error loading projects", error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectSelect = async (projectId) => {
    setSelectedProjectId(projectId);
    setEmployee((prev) => ({ ...prev, projectId }));
    try {
      const projectResponse = await axios.get(`http://localhost:8085/projects/${projectId}`);
      setTasks(projectResponse.data.taches);  // Assuming the backend returns the project data with tasks
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };
  

  console.log(employee)
  const handleTaskSelection = (task) => {
    setEmployee((prev) => ({
      ...prev,
      tachesIds: new Set([...prev.tachesIds, task.id])
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...employee,
      tachesIds: Array.from(employee.tachesIds)
    };
    console.log("Payload:", payload); // Log the payload to check its structure
  
    try {
      await axios.put(`http://localhost:8085/employees/${id}`, payload);
      
    } catch (error) {
      console.error("Failed to save changes:", error.response.data); // Log the server error response
      alert("Failed to update employee. Please try again.");
    }
  };

  const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <InputField label="Employee Name:" name="name" value={employee.name} onChange={handleChange} />
        <ProjectsList projects={projects} onProjectSelect={handleProjectSelect} randomColor={randomColor} />
        {selectedProjectId && (
          <TaskList tasks={tasks} onTaskSelection={handleTaskSelection} randomColor={randomColor}/>
        )}
        <FormActions />
      </form>
      <ProjectModal isOpen={isProjectModalOpen} onClose={() => setProjectModalOpen(false)} projects={projects} addProject={handleProjectSelect} />
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

function ProjectsList({ projects, onProjectSelect, randomColor }) {
  return (
    <div className="form-group">
      <label className="form-label">Projects:</label>
      <select className="form-control" onChange={(e) => onProjectSelect(e.target.value)}>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>{project.name}</option>
        ))}
      </select>
    </div>
  );
}

function TaskList({ tasks, onTaskSelection, randomColor }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ backgroundColor: randomColor() }}>
          <h4>{task.name}</h4>
          <button onClick={() => onTaskSelection(task)}>Select Task</button>
          {/* Display subtasks or other task details here */}
        </div>
      ))}
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

