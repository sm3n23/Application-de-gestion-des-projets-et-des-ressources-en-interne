import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../../Projects/Modal";
import HolidayRequestForm from "../conge/HolidayRequestForm";
import MyHolidayRequests from "../conge/MyHolidayRequests";

const Profile = () => {
  const { id } = useParams();
  const { AuthenticatedEmployee } = useContext(AuthContext);
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
    picture: "",
    projectId: null,
    tachesIds: [],
    absences: 0
  });
  const [projects, setProjects] = useState([]);
  const [isHolidayFormModalOpen, setIsHolidayFormModalOpen] = useState(false);
  const [isHolidayRequestsModalOpen, setIsHolidayRequestsModalOpen] = useState(false);

  useEffect(() => {
    loadEmployeeAndProjects();
  }, [id]);

  const loadEmployeeAndProjects = async () => {
    try {
      const employeeRes = await axios.get(`http://localhost:8085/employees/${id}`);
      const projectsRes = await axios.get("http://localhost:8085/allprojects");

      const employeeData = employeeRes.data;
      const allProjects = projectsRes.data;

      const employeeProjects = allProjects
        .filter((project) =>
          project.employees.some((emp) => emp.id === employeeData.id)
        )
        .map((project) => {
          const employeeTasks = project.employees.find(
            (emp) => emp.id === employeeData.id
          ).taches;
          return {
            ...project,
            tasks: employeeTasks,
          };
        });

      setEmployee(employeeData);
      setProjects(employeeProjects);
    } catch (error) {
      console.error("Error loading employee or projects data:", error);
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const openHolidayFormModal = () => {
    setIsHolidayFormModalOpen(true);
  };

  const closeHolidayFormModal = () => {
    setIsHolidayFormModalOpen(false);
  };

  const openHolidayRequestsModal = () => {
    setIsHolidayRequestsModalOpen(true);
  };

  const closeHolidayRequestsModal = () => {
    setIsHolidayRequestsModalOpen(false);
  };

  const handleAbsencesChange = (e) => {
    setEmployee({ ...employee, absences: e.target.value });
  };

  const saveAbsences = async () => {
    try {
      // Update absences
      await axios.put(`http://localhost:8085/employees/${id}/absences`, { absences: employee.absences });
  
      
      const currentDate = new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
  
      // Create notification
      const notificationMessage = `Une absence pour la date ${currentDate} a été enregistrée dans votre profile.`;
      await axios.post('http://localhost:8085/notifications/create', {
        employeeId: id,
        message: notificationMessage
      });
  
      alert('Absences updated successfully and notification sent.');
    } catch (error) {
      console.error('Failed to update absences or send notification:', error);
      alert('Failed to update absences or send notification. Please try again.');
    }
  };
  

  return (
    <div className="container-p profile-page my-5">
      <div className="header">
        <div className="left-links">
          <Link to="/collaborateur" className="back-link">
            <i className="fa fa-arrow-left"></i> Back
          </Link>
        </div>
        {AuthenticatedEmployee && AuthenticatedEmployee.id === employee.id && (
          <div className="right-links">
            <Link to={`/collaborateur/modifierdetails/${employee.id}`} className="edit-link mx-3">
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
          </div>
        )}
      </div>

      <div className="profile">
        <div className="profile-left">
          <img src={`../../${employee.picture}`} alt="Profile" />
          <h2 className="">{employee.name}</h2>
          <p>{employee.title}</p>
          <p className="description">{employee.description}</p>
          <div className="skills">
            <span className="mx-2">Compétences</span>
            <div>
              {employee.skills.map((skill, index) => (
                <button key={index}>{skill}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="profile-right">
          <div className="section basic-info row">
            <h3>Informations de base</h3>
            <div className="info-item mb-4">
              <p className="col-lg-4">
                <strong>
                  AGE <span>{calculateAge(employee.birthDate)}</span>
                </strong>
              </p>
              <p className="col-lg-4">
                <strong>
                  DES ANNÉES D'EXPÉRIENCE <span>{employee.experience}</span>
                </strong>
              </p>
              <p className="col-lg-4">
                <strong>
                  PHONE <span>{employee.phoneNumber}</span>
                </strong>
              </p>
            </div>
            <div className="info-item">
              <p className="col-lg-4">
                <strong>
                  LOCATION <span>{employee.location}</span>
                </strong>
              </p>
              <p className="col-lg-4">
                <strong>
                  EMAIL <span>{employee.email}</span>
                </strong>
              </p>
            </div>
          </div>
          <div className="section experience">
            
            {AuthenticatedEmployee && AuthenticatedEmployee.id === employee.id && ( 
              <div className="button-group">
                <div className="section basic-info row">
                  <h3>vacances</h3>
                  <div className="info-item mb-4">
                    <p className="col-lg-4">
                      <strong>
                      <button onClick={openHolidayFormModal} className="btn btn-primary btn-blue">
                        Demander des vacances
                      </button>
                      </strong>
                    </p>
                    <p className="col-lg-4">
                      <strong>
                      <button onClick={openHolidayRequestsModal} className="btn btn-primary btn-blue">
                         Mes demande de vacances
                      </button>
                      </strong>
                    </p>
                    
                  </div>
                </div>
                
                <div className="section basic-info row ">
                  <h3>Absences</h3>
                  <div className="info-item mb-4">
                    <p className="col-lg-4">
                      <strong>
                      Vous avez {employee.absences} absences.
                      </strong>
                    </p>
                    
                  </div>
                </div>
              </div>
            )}
            {AuthenticatedEmployee && AuthenticatedEmployee.role === "ChefDeProjet" && (
              
            <div className="section basic-info row my-2">
              <h3>Absences</h3>
              <p className="col-lg-12 m-4">
              <strong>
                
                <span className="absences-container">
                    Ajouter des absences pour ce collaborateur :
                  <input
                    type="number"
                    id="absences"
                    className="form-control absences-input mx-3"
                    value={employee.absences}
                    onChange={handleAbsencesChange}
                  />
                  <button onClick={saveAbsences} className="btn btn-primary save-absences-button">Enregistrer</button>
                </span>
              </strong>

              </p>
            </div>
            )}
          
            
          </div>
        </div>
      </div>

      {isHolidayFormModalOpen && (
        <Modal isOpen={isHolidayFormModalOpen} onClose={closeHolidayFormModal}>
          <HolidayRequestForm onClose={closeHolidayFormModal} />
        </Modal>
      )}

      {isHolidayRequestsModalOpen && (
        <Modal isOpen={isHolidayRequestsModalOpen} onClose={closeHolidayRequestsModal}>
          <MyHolidayRequests onClose={closeHolidayRequestsModal} />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
