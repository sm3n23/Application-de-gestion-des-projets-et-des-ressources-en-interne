import React, { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, onSave, selectedProject }) => {
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    setSelectedTask('');
  }, [selectedProject]);

  const handleSave = () => {
    if (selectedTask) {
      onSave(selectedTask);
      setSelectedTask('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Task</h2>
        {selectedProject ? (
          <div>
            <h3>Project: {selectedProject.name}</h3>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(Number(e.target.value))}
            >
              <option value="">Select a task</option>
              {selectedProject.taches.map((task) => (
                <option key={task.id} value={task.id}>{task.name}</option>
              ))}
            </select>
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <p>Please select a project first.</p>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
