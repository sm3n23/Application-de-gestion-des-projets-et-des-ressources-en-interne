import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import  Modal  from "../../Projects/Modal";
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
    });
    const [projects, setProjects] = useState([]);
    const [isHolidayFormModalOpen, setIsHolidayFormModalOpen] = useState(false);
    const [isHolidayRequestsModalOpen, setIsHolidayRequestsModalOpen] = useState(false);
  
    useEffect(() => {
      loadEmployeeAndProjects();
    }, [id]);
  
    const loadEmployeeAndProjects = async () => {
      try {
        const employeeRes = await axios.get(
          `http://localhost:8085/employees/${id}`
        );
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
  
    return (
      <div className="container-p profile-page">
        <div className="header">
          <div className="left-links">
            <Link to="/collaborateur" className="back-link">
              <i className="fa fa-arrow-left"></i> Back
            </Link>
          </div>
  
          {AuthenticatedEmployee && AuthenticatedEmployee.id === employee.id && (
            <div className="right-links">
              <button onClick={openHolidayFormModal} className="btn btn-primary btn-blue mx-3">
                Demander des vacances
              </button>
              <button onClick={openHolidayRequestsModal} className="btn btn-primary btn-blue mx-3">
                Mes demande de congé
              </button>
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
              <span className="mx-2">Skills</span>
              <div>
                {employee.skills.map((skill, index) => (
                  <button key={index}>{skill}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="profile-right">
            <div className="section basic-info row">
              <h3>Basic Information</h3>
              <div className="info-item mb-4">
                <p className="col-lg-4">
                  <strong>
                    AGE <span>{calculateAge(employee.birthDate)}</span>
                  </strong>
                </p>
                <p className="col-lg-4">
                  <strong>
                    YEARS OF EXPERIENCE <span>{employee.experience}</span>
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
              <h3>Experience</h3>
              <ul className="experience-list">
                <li>
                  <div className="circle infosys">CD</div>
                  <div>
                    <p>
                      <strong>chef De Projet</strong>
                    </p>
                    <p>developper full stack</p>
                    <p>Apr 2020 - Present | Casablanca, Anfa</p>
                  </div>
                </li>
                <li>
                  <div className="circle pixel-studio">BD</div>
                  <div>
                    <p>
                      <strong>Backend developper</strong>
                    </p>
                    <p>SpringBoot</p>
                    <p>Oct 2018 - July 2019 |Casablanca</p>
                  </div>
                </li>
                <li>
                  <div className="circle ramotion-studio">PFE</div>
                  <div>
                    <p>
                      <strong>Satge PFE</strong>
                    </p>
                    <p>fullStack developper</p>
                    <p>April 2016 - July 2018 | Casablanca</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        {/* Holiday Request Form Modal */}
        {isHolidayFormModalOpen && (
          <Modal isOpen={isHolidayFormModalOpen} onClose={closeHolidayFormModal}>
            <HolidayRequestForm onClose={closeHolidayFormModal} />
          </Modal>
        )}
  
        {/* Holiday Requests Modal */}
        {isHolidayRequestsModalOpen && (
          <Modal isOpen={isHolidayRequestsModalOpen} onClose={closeHolidayRequestsModal}>
            <MyHolidayRequests onClose={closeHolidayRequestsModal} />
          </Modal>
        )}
      </div>
    );
  };
  
  export default Profile;
