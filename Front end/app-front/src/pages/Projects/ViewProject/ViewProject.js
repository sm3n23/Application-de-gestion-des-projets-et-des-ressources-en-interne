import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../Modal";
import BudgetModal from './BudgetModal';

export default function ViewProject() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [createdByEmployee, setCreatedByEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isBudgetModalOpen, setBudgetModalOpen] = useState(false);


  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const result = await axios.get(`http://localhost:8085/projects/${id}`);
      const projectData = result.data;
      setProject(projectData);
      if (projectData.createdBy) {
        loadEmployeeByUsername(projectData.createdBy);
      }
    } catch (error) {
      console.error("Error loading project:", error);
    }
  };

  const loadEmployeeByUsername = async (username) => {
    try {
      const result = await axios.get(`http://localhost:8085/employees/user/${username}`);
      setCreatedByEmployee(result.data);
    } catch (error) {
      console.error("Error loading employee by username:", error);
    }
  };

  const calculateProjectAdvancement = (taches) => {
    if (!taches || taches.length === 0) {
      return 0;
    }
    const totalAdvancement = taches.reduce(
      (acc, tache) => acc + (tache.advancement || 0),
      0
    );
    return totalAdvancement / taches.length;
  };

  const getProjectStatus = (advancement) => {
    if (advancement === 0) {
      return "Prévu";
    } else if (advancement > 0 && advancement < 100) {
      return "En cours";
    } else if (advancement === 100) {
      return "Fini";
    }
    return "Unknown";
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const calculateConsumedBudgetPercentage = (budget, consumedBudget) => {
    if (budget === 0) return 0;
    return Math.round((consumedBudget / budget) * 100);
  };

  const toggleBudgetModal = () => {
    setBudgetModalOpen(!isBudgetModalOpen);
   };

   

  const getStatusColor = (status) => {
    if (status === "En cours") {
      return "rgb(249, 119, 20)";
    } else if (status === "Prévu") {
      return "rgb(126, 98, 86)";
    } else if (status === "Fini") {
      return "rgb(154, 154, 154)";
    }
    return "rgb(255, 255, 255)";
  };

  const calculateExpectedAdvancement = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 0;
    if (now > end) return 100;

    const totalTime = end - start;
    const elapsedTime = now - start;

    return (elapsedTime / totalTime) * 100;
  };

  const getAdvancementStatus = (advancement, expectedAdvancement) => {
    const iconStyle = { fontSize: "24px", marginRight: "8px" }; // Adjust the font size and margin as needed

    if (advancement < expectedAdvancement * 0.89) {
      return {
        icon: <i className="fa-solid fa-face-frown sad" style={iconStyle}></i>,
        tooltip: `(Fait: ${advancement.toFixed(
          2
        )}%, Attendu: ${expectedAdvancement.toFixed(2)}%)`,
      };
    } else if (advancement >= expectedAdvancement) {
      return {
        icon: (
          <i className="fa-solid fa-face-smile happy" style={iconStyle}></i>
        ),
        tooltip: `(Fait: ${advancement.toFixed(
          2
        )}%, Attendu: ${expectedAdvancement.toFixed(2)}%)`,
      };
    } else {
      return {
        icon: <i className="fa-solid fa-face-meh normal" style={iconStyle}></i>,
        tooltip: `(Fait: ${advancement.toFixed(
          2
        )}%, Attendu: ${expectedAdvancement.toFixed(2)}%)`,
      };
    }
  };

  
  const greenColors = ["#008000", "#228B22", "#4F7942"];

  

  const getRandomCommonColorGreen = () => {
    const randomIndex = Math.floor(Math.random() * greenColors.length);
    return greenColors[randomIndex];
  };

  const advancement = calculateProjectAdvancement(project.taches);
  const ConsumedBudgetPercentage =calculateConsumedBudgetPercentage(project.budget,project.consumedBudget);
  const status = getProjectStatus(advancement);
  const expectedAdvancement = calculateExpectedAdvancement(
    project.startDate,
    project.finishDate
  );
  const { icon, tooltip } = getAdvancementStatus(
    advancement,
    expectedAdvancement
  );
  return (
    <div>
      <div className="profile-right m-5">
        <div className="section basic-info row">
          <h3>Informations</h3>
          <div className="info-item mb-4">
            <p className="col-lg-6">
              <strong>
                Nom  <span>{project.name}</span>
              </strong>
            </p>
            <p className="col-lg-2 col-md-2">
              <strong>
                Avancement <span>{advancement.toFixed(2)}%</span>
              </strong>
            </p>
            <p className="col-lg-2">
              <strong>
                Avancement Attendu <span>{expectedAdvancement.toFixed(2)}%</span>
              </strong>
            </p>
            <p className="col-lg-2">
              <strong>
                Météo <span title={tooltip}>{icon}</span>
              </strong>
            </p>
          </div>
          <div className="info-item mb-4">
            <p className="col-lg-4">
              <strong>
                Date debut <span>{project.startDate}</span>
              </strong>
            </p>
            <p className="col-lg-4">
              <strong>
                Date fin <span>{project.finishDate}</span>
              </strong>
            </p>
            <p className="col-lg-4">
              <strong>
                Description <span>{project.description} </span>
              </strong>
            </p>
            
          </div>

          <div className="info-item mb-4">
            <p className="col-lg-4">
              <strong>
                Status <span>{status}</span>
              </strong>
            </p>
            <p className="col-lg-4">
              <strong>
                Budget <span>{project.budget} MAD </span>
              </strong>
            </p>
            <p className="col-lg-4">
              <strong>
                Budget consomme <span>{project.consumedBudget} MAD ({ConsumedBudgetPercentage}%) <button type="button" onClick={toggleBudgetModal} className="icon-button">
          <i className="fa-solid fa-eye"></i> plus de details
        </button></span> 

              </strong>
            </p>
          </div>

          <div className="info-itemt mb-4">
            <p className="col-lg-12 mb-3">
              <strong>CPI</strong>
            </p>
            {createdByEmployee &&(
              <div className="d-flex flex-wrap">
                
                  <div key={createdByEmployee.id} className="employee-itemt mb-2">
                    <img
                      className="picture-homet mx-3"
                      src={`../../${createdByEmployee.picture}`}
                      alt="Profile"
                    />
                    <span className="employee-name">{createdByEmployee.name}</span>
                  </div>
                
              </div>
              )}
            
          </div>


          <div className="info-itemt mb-4">
            <p className="col-lg-12 mb-3">
              <strong>Collaborateurs</strong>
            </p>
            {Array.isArray(project.employees) &&
            project.employees.length > 0 ? (
              <div className="d-flex flex-wrap">
                {project.employees.map((emp) => (
                  <div key={emp.id} className="employee-itemt mb-2">
                    <img
                      className="picture-homet mx-3"
                      src={`../../${emp.picture}`}
                      alt="Profile"
                    />
                    <span className="employee-name">{emp.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="info-item mb-4">pas de Collaborateurs</div>
            )}
          </div>

          <div className=" mb-4">
            <p className="">
              <strong>
                Taches
                <p>
                  {Array.isArray(project.taches) &&
                  project.taches.length > 0 ? (
                    project.taches.map((task) => (
                      <span
                        key={task.id}
                        className="tag m-1"
                        style={{
                          backgroundColor: getRandomCommonColorGreen(),
                        }}
                        onClick={() => handleTaskClick(task)}
                      >
                        {task.name}
                      </span>
                    ))
                  ) : (
                    <span>{"Aucune tâche créée"}</span>
                  )}
                </p>
              </strong>
            </p>
          </div>
        </div>
        {selectedTask && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="modal-close-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                </button>
                <h4 className="">Détails de la tâche:</h4>
                <div className="form-box-modal">
                  <div className="flex-container">
                    <div className="profile-right">
                      <div className="section basic-info row">
                        <div className="info-item mb-4">
                          <p className="col-lg-12">
                            <strong>
                              Tache: <span>{selectedTask.name}</span>
                            </strong>
                          </p>
                        </div>
                        <div className="info-item mb-4">
                          <p className="col-lg-4">
                            <strong>
                              Description{" "}
                              <span>{selectedTask.description}</span>
                            </strong>
                          </p>
                        </div>
                        <div className="info-item mb-4">
                          <p className="col-lg-4">
                            <strong>
                              Date debut <span>{selectedTask.startDate}</span>
                            </strong>
                          </p>
                          <p className="col-lg-4">
                            <strong>
                              Date fin <span>{selectedTask.finishDate}</span>
                            </strong>
                          </p>
                        </div>
                        <div className="info-item mb-4">
                          <p className="col-lg-4">
                            <strong>
                              Avancement{" "}
                              <span>({selectedTask.advancement}%)</span>
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-container my-3"></div>
                </div>
              </div>
            </div>
          </Modal>
          
        )}
        <BudgetModal
 isOpen={isBudgetModalOpen}
 onClose={toggleBudgetModal}
 budgetConsumptions={project.budgetConsumptions || []}
/>

      </div>
    </div>
  );
}
