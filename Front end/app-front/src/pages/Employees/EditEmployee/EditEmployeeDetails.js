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
        skills: skills ? skills : [], 
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
        employeeTasks: taches ? taches : [], 
      });
      
    } catch (error) {
      console.error("Error loading employee:", error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...employee,
      skills: employee.skills.map((skill) => skill.text), // Ensure skills are sent as an array of strings
      
    };
    try {
      await axios.put(`http://localhost:8085/employees/${id}`, payload);
      navigate("/collaborateur");
    } catch (error) {
      console.error("Failed to save changes:", error.response.data);
      alert("Failed to update employee. Please try again.");
    }
  };

  
  

  const handleAddition = (tag) => {
    setEmployee((prev) => ({
      ...prev,
      skills: [...prev.skills, tag.text],
    }));
  };

  const handleDelete = (i) => {
    setEmployee((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== i),
    }));
  };

  return (
    <div className="container">
      <div className="form-box p-5">
        <div className="button-group">
          
        </div>
        <form onSubmit={handleSubmit}>
          
              <div className="flex-container">
                <InputField
                  required
                  label="Employee Name:"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                />
                <InputField
                  required
                  label="Title:"
                  name="title"
                  value={employee.title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-container my-3">
                <InputField
                  required
                  label="Email:"
                  name="email"
                  type="email"
                  value={employee.email}
                  onChange={handleChange}
                />
                <InputField
                  required
                  label="Birth Date:"
                  name="birthDate"
                  type="date"
                  value={employee.birthDate}
                  onChange={handleChange}
                />
                <InputField
                  required
                  label="Experience (years):"
                  name="experience"
                  type="number"
                  value={employee.experience}
                  onChange={handleChange}
                />
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
                        tags: "ReactTags__tags",
                        tagInput: "ReactTags__tagInput",
                        tagInputField: "ReactTags__tagInput input",
                        selected: "ReactTags__selected",
                        tag: "ReactTags__tag m-1",
                        remove: "ReactTags__remove",
                        suggestions: "ReactTags__suggestions",
                      }}
                      tags={employee.skills.map((skill, index) => ({
                        id: index.toString(),
                        text: skill,
                      }))}
                    />
                  </div>
                </div>
                <TextAreaField
                  required
                  label="Description:"
                  name="description"
                  value={employee.description}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-container">
                <InputField
                  required
                  label="Phone Number:"
                  name="phoneNumber"
                  type="tel"
                  value={employee.phoneNumber}
                  onChange={handleChange}
                />
                <InputField
                  required
                  label="Location:"
                  name="location"
                  value={employee.location}
                  onChange={handleChange}
                />
                <InputField
                  required
                  label="Picture:"
                  name="picture"
                  value={employee.picture}
                  onChange={handleChange}
                />
              </div>
          
          <FormActions />
        </form>
      </div>
      
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text", required }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, rows = 4, required }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <textarea
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
      ></textarea>
    </div>
  );
}

function TaskList({ tasks, selectedTaskIds, onTaskSelection, getRandomCommonColorGreen }) {
  return (
    <div className="form-group">
      <label className="form-label">Tasks:</label>
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
    <div className="form-actions my-3">
      <button type="submit" className="btn  btn-orange-primary-edit px-3">
        Save Changes
      </button>
      <Link to="/collaborateur" className="btn  btn-orange-outline mx-4">
        Cancel
      </Link>
    </div>
  );
}
