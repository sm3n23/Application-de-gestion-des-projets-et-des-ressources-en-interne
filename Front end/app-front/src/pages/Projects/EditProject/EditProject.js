import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditProject.css";
import TaskModal from "./TaskModal";
import EmployeeModal from "./EmployeeModal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ErrorModal from "./ErrorModal";

const processEmployees = (employees, projects) => {
  return employees.map((employee) => {
    const tasks = employee.taches ? employee.taches.map((tache) => tache.name) : ["Aucune tâche assignée"];
    const projectNames = projects
      .filter((project) => project.employees.some((projEmp) => projEmp.id === employee.id))
      .map((project) => project.name)
      .join(' , ') || "Aucun projet assigné";

    return {
      id: employee.id,
      picture: employee.picture,
      name: employee.name,
      projects: projectNames,
      tasks: tasks.length > 0 ? tasks : ["Aucune tâche assignée"],
    };
  });
};

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: "",
    status: "",
    startDate: "",
    finishDate: "",
    budget: "",
    description: "",
    employees: [],
    taches: [],
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);

  const [isCommentFieldVisible, setCommentFieldVisible] = useState(false);
  const [budgetConsumption, setBudgetConsumption] = useState({
    amount: '',
    comment: ''
  });

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [employeeProjects, setEmployeeProjects] = useState([]);
  

  useEffect(() => {
    loadEmployeesAndProjects();
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/projects/${id}`);
      const projectData = response.data;
      projectData.totalConsumedBudget = calculateTotalConsumedBudget(projectData.budgetConsumptions);
      setProject(projectData);
    } catch (error) {
      console.error("Error loading project:", error);
    }
  };

  const loadEmployeesAndProjects = async () => {
    try {
      const [employeesResponse, projectsResponse] = await Promise.all([
        axios.get("http://localhost:8085/employees"),
        axios.get("http://localhost:8085/allprojects"),
      ]);

      const allEmployees = employeesResponse.data;
      const allProjects = projectsResponse.data;

      const processedEmployees = processEmployees(allEmployees, allProjects);

      setAllEmployees(processedEmployees);
    } catch (error) {
      console.error("Failed to load employees and projects:", error);
    }
  };

  
  const handleChange = ({ target: { name, value } }) => {
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const addEmployeeToProject = async (employee) => {
    try {
      const employeeData = allEmployees.find(emp => emp.id === employee.id);
  
      if (employeeData.projects.split(' , ').length >= 3) {
        const formattedProjects = employeeData.projects.split(' , ').join(', ');
        setErrorMessage(`Cet employé travaille déjà sur 3 projets (${formattedProjects}) et ne peut être ajouté à un autre.`);
        setEmployeeProjects(employeeData.projects);
        setIsErrorModalOpen(true);
        return;
      }
  
      // Fetch holiday requests and check if the employee is on vacation
      const holidayResponse = await axios.get("http://localhost:8085/holiday-requests");
      const holidayRequests = holidayResponse.data;
  
      const today = new Date();
      let onVacation = false;
      let vacationStartDate = null;
      let vacationEndDate = null;
  
      holidayRequests.forEach(request => {
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        if (request.employee.id === employee.id && 
            request.status === "APPROVED" && 
            today >= startDate && today <= endDate) {
          onVacation = true;
          vacationStartDate = startDate;
          vacationEndDate = endDate;
        }
      });
  
      if (onVacation) {
        setErrorMessage(`Cet employé est actuellement en vacances du ${vacationStartDate.toLocaleDateString()} au ${vacationEndDate.toLocaleDateString()} et ne peut être ajouté à un projet.`);
        setIsErrorModalOpen(true);
        return;
      }
  
      await axios.post('http://localhost:8085/notifications/create', {
        employeeId: employee.id,
        message: `Vous avez été ajouté au projet: ${project.name}`
      });
  
      const employeeWithProject = { ...employee, project };
      setProject((prev) => ({
        ...prev,
        employees: [...prev.employees, employeeWithProject],
      }));
    } catch (error) {
      console.error("Error adding employee to project:", error);
      setErrorMessage("Failed to add employee to project. Please try again.");
      setIsErrorModalOpen(true);
    }
  };
  
  

  const removeEmployeeFromProject = (employeeId) => {
    setProject((prev) => ({
        ...prev,
        employees: prev.employees.filter((emp) => emp.id !== employeeId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = {
        ...project,
        employeesIds: project.employees.map((emp) => emp.id) || [], // Ensure it's an array
      };
      console.log("Updating project with data:", updatedProject); // Debug log
      await axios.put(`http://localhost:8085/projects/${id}`, updatedProject);
      
      if (budgetConsumption.amount) {
        const budgetResponse = await axios.post(
          `http://localhost:8085/projects/${id}/budget-consumption`,
          {
            amount: budgetConsumption.amount,
            comment: budgetConsumption.comment,
            date: new Date().toISOString() // Automatically add the current date
          }
        );
        if (budgetResponse.status === 201) {
          alert("Budget consumption added successfully");
        }
      }
      
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
        projectId: id,
      };

      const response = await axios.post(
        "http://localhost:8085/taches",
        newTask
      );
      if (response.status === 201) {
        // Check if the task was created successfully
        setProject((prev) => ({
          ...prev,
          taches: [...prev.taches, response.data], // Add the new task to the current list
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

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8085/taches/${taskId}`
      );
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

  const handleConsumedBudgetChange = (e) => {
    setBudgetConsumption({ ...budgetConsumption, amount: e.target.value });
  };

  const handleCommentChange = (e) => {
    setBudgetConsumption({ ...budgetConsumption, comment: e.target.value });
  };

  const toggleCommentField = () => {
    setCommentFieldVisible(!isCommentFieldVisible);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
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

  const calculateTotalConsumedBudget = (budgetConsumptions) => {
    return budgetConsumptions.reduce((total, consumption) => total + consumption.amount, 0);
   };

   
  return (
    <div className="container">
      <div className="form-box p-5">
        <form onSubmit={handleSubmit}>
          <div className="flex-container">
            <InputField
              label="Projet :"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="Date debut:"
              name="startDate"
              type="date"
              value={project.startDate}
              onChange={handleChange}
              required
            />
            <InputField
              label="Date fin:"
              name="finishDate"
              type="date"
              value={project.finishDate}
              onChange={handleChange}
              required
            />
            <SelectField
              label="Status:"
              name="status"
              value={project.status}
              options={["En cours", "Prévu", "Fini"]}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-container">
          
            
            <InputField
              label="Budget:"
              name="budget"
              type="number"
              value={project.budget}
              onChange={handleChange}
              required
            />
            <InputField
              label="Budget Consommé Total:"
              name="totalConsumedBudget"
              value={project.totalConsumedBudget}
              onChange={handleChange}
              required
              readOnly
            />
            <div className="form-group m-1">
            <label className="form-label">Budget Consommé:</label>
            <input
              type="number"
              className="form-control"
              value={budgetConsumption.consumedBudget}
              onChange={handleConsumedBudgetChange}
              required
            />
            <button type="button" onClick={toggleCommentField} className="icon-button">
              <i className="fas fa-circle-plus"></i> Ajouter un commentaire
            </button>
          </div>
          {isCommentFieldVisible && (
            <div className="form-group m-1">
              <label className="form-label">Commentaire:</label>
              <textarea
                className="form-control"
                value={budgetConsumption.comment}
                onChange={handleCommentChange}
                rows="2"
                required
              ></textarea>
            </div>
          )}
          </div>
          

          <TextAreaField
            label="Description:"
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          />

          

          
          

          <EmployeeList
            projectId={id}
            employees={project.employees}
            onAddClick={() => setEmployeeModalOpen(true)}
            randomColor={getRandomCommonColorGrey}
            removeEmployeeFromProject={removeEmployeeFromProject}
          />
          <TaskList
            tasks={project.taches}
            onDeleteTask={handleDeleteTask}
            onAddTask={() => setTaskModalOpen(true)}
            randomColor={getRandomCommonColorGreen}
          />
          <FormActions />
        </form>
      </div>
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSave={addNewTask}
      />
      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setEmployeeModalOpen(false)}
        employees={allEmployees}
        addEmployee={addEmployeeToProject}
        projectEmployees={project.employees}
      />
      <ErrorModal 
                isOpen={isErrorModalOpen} 
                onClose={() => setIsErrorModalOpen(false)} 
                errorMessage={errorMessage} 
                projects={employeeProjects}
            />
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text", required }) {
  return (
    <div className="form-group m-1">
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

function SelectField({ label, name, value, options, onChange, required }) {
  return (
    <div className="form-group m-1">
      <label className="form-label">{label}</label>
      <select
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, required }) {
  return (
    <div className="form-group m-1">
      <label className="form-label">{label}</label>
      <textarea
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        rows="2"
        required={required}
      ></textarea>
    </div>
  );
}

function EmployeeList({ projectId, employees, onAddClick, randomColor, removeEmployeeFromProject }) {
  if (!employees || employees.length === 0) {
    return (
      <div className="form-group m-1">
        <label className="form-label">Collaborateurs:</label>
        <div className="form-control my-2">
          <button type="button" onClick={onAddClick} className="icon-button">
            <i className="fas fa-circle-plus"></i> Ajouter un(e) Collaborateur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-group m-1">
      <label className="form-label">Collaborateurs:</label>
      <div className="form-control my-2">
        {employees.map((employee) => (
          <React.Fragment key={employee.id}>
            <Link
              to={`/collaborateur/edit/${employee.id}`}
              state={{ projectId }}
              className="tag p-2 m-1"
              style={{ backgroundColor: randomColor() }}
            >
              {employee.name}{" "}
              <span className="icon-button-brown">
                <i className="fa-solid fa-pen-to-square"></i>
              </span>
            </Link>
            <span className="remove-employee-button" onClick={() => removeEmployeeFromProject(employee.id)}>
              <i className="fa-sharp fa-solid fa-circle-xmark"></i>
            </span>
          </React.Fragment>
        ))}
        <button type="button" onClick={onAddClick} className="icon-button">
          <i className="fas fa-circle-plus"></i> Ajouter un(e) Collaborateur
        </button>
      </div>
    </div>
  );
}


function TaskList({ tasks, onDeleteTask, onAddTask, randomColor }) {
  return (
    <div className="form-group m-1">
      <label className="form-label">Tâches:</label>
      <div className="form-control my-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="tag my-3"
            style={{ backgroundColor: randomColor() }}
          >
            {task.name}
            <button
              type="button"
              onClick={() => onDeleteTask(task.id)}
              className="icon-button"
            >
              <i className="fa-sharp fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        ))}
        <button type="button" onClick={onAddTask} className="icon-button">
          <i className="fas fa-circle-plus"></i> Ajouter une tâche
        </button>
      </div>
    </div>
  );
}

function FormActions() {
  return (
    <div className="form-actions my-3 mx-1">
      <button type="submit" className="btn  btn-orange-primary-edit px-3">
        Enregistrer les changements{" "}
      </button>
      <Link to="/projects" className="btn  btn-orange-outline mx-4">
        Annuler
      </Link>
    </div>
  );
}
