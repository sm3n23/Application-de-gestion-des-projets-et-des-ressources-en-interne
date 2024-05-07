import React, { useState } from 'react';
import ReactDOM from 'react-dom';


function TaskModal({ isOpen, onClose, onSave }) {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(taskName);
        setTaskName('');
        onClose();
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-content">
            {console.log("Rendering modal content")}
                <span className="modal-close-button" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        id="taskName"
                        type="text"
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                        required
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>
            
        </div>
    );


    return ReactDOM.createPortal(
        modalContent,
        document.body
    );
}

export default TaskModal;
