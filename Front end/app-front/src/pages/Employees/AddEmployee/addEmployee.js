import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { WithContext as ReactTags } from 'react-tag-input';

export default function AddEmployee() {
  const navigate = useNavigate();
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
    picture:''
  });

  const handleChange = ({ target: { name, value } }) => {
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...employee,
      skills: employee.skills
    };
    try {
      await axios.post(`http://localhost:8085/employees`, payload);
      navigate("/collaborateur");
    } catch (error) {
      console.error("Failed to save changes:", error.response.data);
      alert("Failed to add employee. Please try again.");
    }
  };

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
      <form onSubmit={handleSubmit}>
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
            <InputField required label="Picture:" name="picture" value={employee.picture} onChange={handleChange} />
          </div>
        
          <FormActions />
        </form>
      </div>
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

function FormActions() {
  return (
    <div className="form-actions my-3">
      <button type="submit" className="btn  btn-orange-primary-edit px-3">Save Changes</button>
      <Link to="/collaborateur" className="btn  btn-orange-outline mx-4">Cancel</Link>
    </div>
  );
}
