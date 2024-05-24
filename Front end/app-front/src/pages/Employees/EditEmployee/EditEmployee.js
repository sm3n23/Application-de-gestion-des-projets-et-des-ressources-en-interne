import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditEmployee.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { WithContext as ReactTags } from 'react-tag-input';
import TaskModal from "./TaskModal"; // Adjust the path as necessary

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [employee, setEmployee] = useState({
    name: '',
    title: '',
    skills: [],
    description: '',
    birthDate: '',
    experience: '',
    phoneNumber: '',
    email: '',
    location: '',
    projectId: null,
    tachesIds: []
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [section, setSection] = useState('details');

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/employees/${id}`);
      const { name, title, skills, description, birthDate, experience, phoneNumber, email, location, project, taches } = response.data;
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
        projectId: project ? project.id : null,
        tachesIds: taches ? taches.map(t => t.id) : []
      });
      if (project && project.id) {
        setTasks(project.taches);
      }
    } catch (error) {
      console.error("Error loading employee:", error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskSelection = (task) => {
    setEmployee((prev) => {
      const tachesIds = new Set(prev.tachesIds);
      if (tachesIds.has(task.id)) {
        tachesIds.delete(task.id);
      } else {
        tachesIds.add(task.id);
      }
      return { ...prev, tachesIds: Array.from(tachesIds) };
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
      skills: employee.skills // Send skills as an array of strings
    };
    try {
      await axios.put(`http://localhost:8085/employees/${id}`, payload);
      navigate("/collaborateur");
    } catch (error) {
      console.error("Failed to save changes:", error.response.data);
      alert("Failed to update employee. Please try again.");
    }
  };

  const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

  const handleAddition = (tag) => {
    setEmployee((prev) => ({
      ...prev,
      skills: [...prev.skills, tag.text]
    }));
  };

  const handleDelete = (i) => {
    setEmployee((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== i)
    }));
  };

  return (
    <div className="container">
      <div className="form-box p-5">
        <div className="button-group">
          <button type="button" className={`btn ${section === 'details' ? 'toggle-btn' : 'toggle-btn-outline'}`} onClick={() => setSection('details')}>
            Employee Details
          </button>
          <button type="button" className={`btn ${section === 'project' ? 'toggle-btn' : 'toggle-btn-outline'}`} onClick={() => setSection('project')}>
            Project & Tasks
          </button>
        </div>
        <form onSubmit={handleSubmit}>
        {section === 'details' && (
          <>
          <div className="flex-container">
            <InputField required label="Employee Name:" name="name" value={employee.name} onChange={handleChange} />
            <InputField required label="Title:" name="title" value={employee.title} onChange={handleChange} />
          </div>
          <div className="flex-container my-3">
            <InputField required label="Email:" name="email" type="email" value={employee.email} onChange={handleChange} />
            <InputField required label="Birth Date:" name="birthDate" type="date" value={employee.birthDate} onChange={handleChange} />
            <InputField required label="Experience (years):" name="experience" type="number" value={employee.experience} onChange={handleChange} />
          </div>
          <div className="flex-container my-3">
            
            <div className="form-group">
              <label className="form-label">Skills:</label>
              <div className="form-control">
                <ReactTags
                  
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  allowDragDrop={false}
                  inputFieldPosition="inline"
                  placeholder="Add new skill"
                  classNames={{
                    tags: 'ReactTags__tags',
                    tagInput: 'ReactTags__tagInput',
                    tagInputField: 'ReactTags__tagInput input',
                    selected: 'ReactTags__selected',
                    tag: 'ReactTags__tag m-1',
                    remove: 'ReactTags__remove',
                    suggestions: 'ReactTags__suggestions'
                  }}
                  tags={employee.skills.map((skill, index) => ({ id: index.toString(), text: skill }))}
                />
                
              </div>
              
            </div>
          <TextAreaField required label="Description:" name="description" value={employee.description} onChange={handleChange} />

          </div>
          <div className="flex-container">
            <InputField required label="Phone Number:" name="phoneNumber" type="tel" value={employee.phoneNumber} onChange={handleChange} />
            <InputField required label="Location:" name="location" value={employee.location} onChange={handleChange} />
          </div>
          </>
          )}
          {section === 'project' && (
            <>
          {employee.project && (
            <div className="form-group">
              <label className="form-label">Project:</label>
              <input type="text" className="form-control" value={employee.project.name} readOnly />
            </div>
          )}
          {tasks.length > 0 && (
            <TaskList tasks={tasks} selectedTaskIds={new Set(employee.tachesIds)} onTaskSelection={handleTaskSelection} onTaskClick={handleTaskClick} randomColor={randomColor} />
          )}
          </>
          )}
          <FormActions />
        </form>
      </div>
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} task={selectedTask} />
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

function TextAreaField({ label, name, value, onChange, rows = 4, required }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <textarea className="form-control" name={name} value={value} onChange={onChange} rows={rows} required={required}></textarea>
    </div>
  );
}

function TaskList({ tasks, selectedTaskIds, onTaskSelection, onTaskClick, randomColor }) {
  return (
    <div className="form-group">
      <label className="form-label">Tasks:</label>
      <div className="form-control my-2">
        {tasks.map((task) => (
          <div key={task.id} className="tag my-3" style={{ backgroundColor: randomColor() }} onClick={() => onTaskClick(task)}>
            {task.name}
            <button type="button" onClick={() => onTaskSelection(task)} className="icon-button">
              {selectedTaskIds.has(task.id) ? <i className="fas fa-check-circle"></i> : <i className="fas fa-plus-circle"></i>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormActions() {
  return (
    <div className="form-actions my-3">
      <button type="submit" className="btn  btn-orange-primary-edit px-3">Save Changes</button>
      <Link to="/collaborateur" className="btn  btn-orange-outline mx-4">Cancel</Link>
    </div>
  );
}
