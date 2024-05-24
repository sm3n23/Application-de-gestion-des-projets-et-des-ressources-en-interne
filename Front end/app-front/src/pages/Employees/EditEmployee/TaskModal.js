import React, { useEffect, useState } from 'react';
import Modal from '../../Projects/Modal';
import axios from 'axios';
import './TaskModal.css'

function TaskModal({ isOpen, onClose, task }) {
  const [subTaskName, setSubTaskName] = useState('');
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);
  const [sousTaches, setSousTaches] = useState(task ? task.sousTaches : []);

  useEffect(() => {
    if (task) {
      setSousTaches(task.sousTaches);
      setUpdatedTask(task);
    }
  }, [task]);

  const handleAddSubTask = async () => {
    if (subTaskName.trim()) {
      try {
        const response = await axios.post('http://localhost:8085/soustaches', {
          name: subTaskName,
          tacheId: task.id,
          completed: false
        });
        const newSubTask = response.data;
        const updatedSousTaches = [...sousTaches, newSubTask];
        setSousTaches(updatedSousTaches);
        setUpdatedTask({ ...updatedTask, sousTaches: updatedSousTaches });
        setSubTaskName('');
        setIsAddingSubTask(false);
      } catch (error) {
        console.error('Error adding sous-tache:', error);
        alert('Failed to add sous-tache. Please try again.');
      }
    } else {
      alert('Please enter a name for the sous-tache.');
    }
  };

  const handleToggleSubTaskForm = (e) => {
    e.preventDefault();
    setIsAddingSubTask(!isAddingSubTask);
  };

  const handleSubTaskCompletionChange = async (updatedSousTache) => {
    try {
      const response = await axios.put(`http://localhost:8085/soustaches/${updatedSousTache.id}`, updatedSousTache);
      const updatedSubTask = response.data;
      const updatedSousTaches = sousTaches.map(st => (st.id === updatedSubTask.id ? updatedSubTask : st));
      setSousTaches(updatedSousTaches);
      setUpdatedTask({ ...updatedTask, sousTaches: updatedSousTaches });
    } catch (error) {
      console.error('Error updating sous-tache completion:', error);
      alert('Failed to update sous-tache. Please try again.');
    }
  };

  const toggleSubTaskCompletion = (subTaskId) => {
    const updatedSousTaches = sousTaches.map(st => {
      if (st.id === subTaskId) {
        const updatedSousTache = { ...st, completed: !st.completed, tacheId: task.id };
        handleSubTaskCompletionChange(updatedSousTache);
        return updatedSousTache;
      }
      return st;
    });
    setSousTaches(updatedSousTaches);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="task-details">
        <h4>Task Details :</h4>
        {updatedTask ? (
          <div>
            <p><strong>Name:</strong> {updatedTask.name}</p>
            <label for="customRange2" class="form-label">Avancement</label>
            <input type="range" class="form-range" min="0" max="100" id="customRange2"></input>
            <div className="sous-taches-header">
              <div className='sous-tache-text'>Sous Taches: <button type="button" className="modal-add-button" onClick={handleToggleSubTaskForm}>
                <i className="fas fa-plus-circle "></i>
              </button></div>
            </div>
            {updatedTask.sousTaches && updatedTask.sousTaches.map((soustache) => (
              <div key={soustache.id}>
                <input 
                  type="checkbox" 
                  checked={soustache.completed}
                  onChange={() => {
                    console.log('Checkbox clicked for sous-tache:', soustache.id); // Debug log
                    toggleSubTaskCompletion(soustache.id);
                  }}
                />
                {soustache.name}
              </div>
            ))}
            {isAddingSubTask && (
              <div className="add-sous-tache container">
                <div className='row form-floating mb-3'>
                  
                <input
                  type="text"
                  className='col-9 form-control'
                  id='soustachename'
                  value={subTaskName}
                  onChange={(e) => setSubTaskName(e.target.value)}
                  placeholder="Sous-Tache"
                />
                <label for="soustachename">Sous tache name</label>
                <button type="button" onClick={handleAddSubTask} className="btn col-1"><i className="fas fa-plus-circle"></i></button>
                <div className='col-2'></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No task selected</p>
        )}
      </div>
    </Modal>
  );
}

export default TaskModal;
