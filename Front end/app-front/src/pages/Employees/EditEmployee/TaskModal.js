import React, { useEffect, useState } from "react";
import Modal from "../../Projects/Modal";
import axios from "axios";
import "./TaskModal.css";
import { useParams } from "react-router-dom";

function TaskModal({ isOpen, onClose, task }) {
  const [subTask, setSubTask] = useState({
    name: "",
    startDate: "",
    finishDate: "",
  });
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);
  const [sousTaches, setSousTaches] = useState(task ? task.sousTaches : []);
  const [activeTab, setActiveTab] = useState("details");
  const { id } = useParams();

  useEffect(() => {
    if (task) {
      setSousTaches(task.sousTaches);
      setUpdatedTask(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubTask = async () => {
    if (subTask) {
      try {
        const response = await axios.post("http://localhost:8085/soustaches", {
          name: subTask.name,
          startDate: subTask.startDate,
          finishDate: subTask.finishDate,
          tacheId: task.id,
          completed: false,
        });
        const newSubTask = response.data;
        const updatedSousTaches = [...sousTaches, newSubTask];
        setSousTaches(updatedSousTaches);
        setUpdatedTask({ ...updatedTask, sousTaches: updatedSousTaches });
        setSubTask({});
        setIsAddingSubTask(false);
      } catch (error) {
        console.error("Error adding sous-tache:", error);
        alert("Failed to add sous-tache. Please try again.");
      }
    } else {
      alert("Please enter all fields for the sous-tache.");
    }
  };

  const handleToggleSubTaskForm = (e) => {
    e.preventDefault();
    setIsAddingSubTask(!isAddingSubTask);
  };

  const handleSubTaskCompletionChange = async (updatedSousTache) => {
    try {
      const response = await axios.put(
        `http://localhost:8085/soustaches/${updatedSousTache.id}`,
        updatedSousTache
      );
      const updatedSubTask = response.data;
      const updatedSousTaches = sousTaches.map((st) =>
        st.id === updatedSubTask.id ? updatedSubTask : st
      );
      setSousTaches(updatedSousTaches);
      setUpdatedTask({ ...updatedTask, sousTaches: updatedSousTaches });
    } catch (error) {
      console.error("Error updating sous-tache completion:", error);
      alert("Failed to update sous-tache. Please try again.");
    }
  };

  const toggleSubTaskCompletion = (subTaskId) => {
    const updatedSousTaches = sousTaches.map((st) => {
      if (st.id === subTaskId) {
        const updatedSousTache = {
          ...st,
          completed: !st.completed,
          tacheId: task.id,
        };
        handleSubTaskCompletionChange(updatedSousTache);
        return updatedSousTache;
      }
      return st;
    });
    setSousTaches(updatedSousTaches);
  };

  const handleAvancementChange = (e) => {
    const newValue = e.target.value;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      advancement: newValue,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Saving changes:", updatedTask); // Debug log
      const payload = {
        id: updatedTask.id,
        name: updatedTask.name,
        description: updatedTask.description,
        startDate: updatedTask.startDate,
        finishDate: updatedTask.finishDate,
        advancement: updatedTask.advancement,
        projectId: updatedTask.id,
      };
      const response = await axios.put(
        `http://localhost:8085/taches/${updatedTask.id}`,
        payload
      );
      if (response.status === 200) {
        onClose(); // Close the modal after saving changes
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const renderTaskDetails = () =>
    updatedTask && (
      <div className="form-box-modal">
        <div className="flex-container">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Task Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={updatedTask.name || ""}
              disabled
            />
          </div>
        </div>
        <div className="flex-container my-2">
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="form-control"
              value={updatedTask.description || ""}
              disabled
              required
            />
          </div>
        </div>
        <div className="flex-container my-3">
          <div className="form-group">
            <label className="form-label" htmlFor="startDate">
              Start Date:
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              className="form-control"
              value={updatedTask.startDate || ""}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="finishDate">
              Finish Date:
            </label>
            <input
              id="finishDate"
              name="finishDate"
              type="date"
              className="form-control"
              value={updatedTask.finishDate || ""}
              disabled
            />
          </div>
        </div>
        <div className="range-container">
          <label htmlFor="customRange2" className="form-label">
            Avancement
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="100"
            step="25"
            id="customRange2"
            value={updatedTask.advancement || 0}
            onChange={handleAvancementChange}
          />
          <div className="range-labels">
            <span className="range-label">Not Started</span>
            <span className="range-label">On Going</span>
            <span className="range-label">Finished</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-orange-primary  px-3 my-3"
          onClick={handleSaveChanges}
        >
          Valider
        </button>
      </div>
    );

  const renderSousTaches = () => (
    <div className="form-box-modal">
      <div className="sous-tache-container">
        {updatedTask.sousTaches &&
          updatedTask.sousTaches.map((soustache) => (
            <div className="form-group " key={soustache.id}>
              <label
                className="containerCheckbox"
                htmlFor={`checkbox-${soustache.id}`}
              >
                <input
                  id={`checkbox-${soustache.id}`}
                  className="form-check-input checkbox"
                  type="checkbox"
                  checked={soustache.completed}
                  onChange={() => {
                    console.log(
                      "Checkbox clicked for sous-tache:",
                      soustache.id
                    );
                    toggleSubTaskCompletion(soustache.id);
                  }}
                />
                <div className="soustache-details">
                  <span>{soustache.name}</span>
                  <span className="st-span">
                    {soustache.startDate} / {soustache.finishDate}
                  </span>
                </div>
                
              </label>
              <div className="separator-st"></div>
            </div>
          ))}
      </div>
      {isAddingSubTask && (
        <div className="add-sous-tache container">
          <div className="flex-container">
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Task Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={subTask.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex-container my-3">
            <div className="form-group">
              <label className="form-label" htmlFor="startDate">
                Start Date:
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className="form-control"
                value={subTask.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="finishDate">
                Finish Date:
              </label>
              <input
                id="finishDate"
                name="finishDate"
                type="date"
                className="form-control"
                value={subTask.finishDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddSubTask}
            className="btn btn-orange-primary px-3"
          >
            Ajouter
          </button>
        </div>
      )}
      {!isAddingSubTask && (
        <button
          type="button"
          className="btn btn-orange-st-primary my-3"
          onClick={handleToggleSubTaskForm}
        >
          Ajouter sous tache
        </button>
      )}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close-button" onClick={onClose}>
            <i className="fa-sharp fa-solid fa-circle-xmark"></i>
          </button>
          <div className="button-group">
            <button
              className={`my-0 btn ${
                activeTab === "details" ? "toggle-btn" : "toggle-btn-outline"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Task Details
            </button>
            <button
              className={`btn ${
                activeTab === "sousTaches" ? "toggle-btn" : "toggle-btn-outline"
              }`}
              onClick={() => setActiveTab("sousTaches")}
            >
              Sous Taches
            </button>
          </div>
          {activeTab === "details" && renderTaskDetails()}
          {activeTab === "sousTaches" && renderSousTaches()}
        </div>
      </div>
    </Modal>
  );
}

export default TaskModal;
