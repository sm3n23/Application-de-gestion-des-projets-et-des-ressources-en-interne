import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../EditProject/EditProject.css';

const AddProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({ name: '', status: '', startDate: '', finishDate: '' });

  const handleChange = ({ target: { name, value } }) => {
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8085/projects', project);
      navigate('/projects');
    } catch (error) {
      console.error('Failed to add project:', error.response || error.message);
      alert('Failed to add project. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <InputField required label="Project Name:" name="name" value={project.name} onChange={handleChange} />
        <SelectField label="Status:" name="status" value={project.status} options={["On Going", "Not Started", "Finished"]} onChange={handleChange} />
        <InputField label="Start Date:" name="startDate" type="date" value={project.startDate} onChange={handleChange} />
        <InputField label="Finish Date:" name="finishDate" type="date" value={project.finishDate} onChange={handleChange} />
        <FormActions />
      </form>
    </div>
  );
};

function InputField({ label, name, value, onChange, type = 'text' }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input type={type} className="form-control" name={name} value={value} onChange={onChange} />
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

function FormActions() {
  return (
    <div className="form-actions my-3">
      <button type="submit" className="btn btn-primary btn-orange m-3">Add Project</button>
      <Link to="/projects" className="btn btn-danger">Cancel</Link>
    </div>
  );
}

export default AddProject;
