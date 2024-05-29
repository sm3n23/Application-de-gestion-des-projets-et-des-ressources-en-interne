import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function TaskModal({ isOpen, onClose, onSave }) {
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        startDate: '',
        finishDate: '',
        advancement: 0,
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(taskData);
        setTaskData({
            name: '',
            description: '',
            startDate: '',
            finishDate: '',
            advancement: 0,
            status: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-content">
                
                <span className="modal-close-button" onClick={onClose}><i className=" fa-sharp fa-solid fa-circle-xmark"></i></span>
                <div className="">
                    <div className="form-box-modal">
                        <form onSubmit={handleSubmit}>
                        <div className="flex-container">
                            <div className="form-group">
                            <label className="form-label" for="name">Task Name:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-control"
                                value={taskData.name}
                                onChange={handleChange}
                                required
                            />
                            </div>
                            
                        </div>
                        <div className="flex-container my-2">
                            <div className="form-group">
                                <label className="form-label" for="description">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    rows="2"
                                    value={taskData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex-container my-3">
                            <div className="form-group">
                                <label className="form-label" for="startDate">Start Date:</label>
                                <input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    className="form-control"
                                    value={taskData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="finishDate">Finish Date:</label>
                                <input
                                    id="finishDate"
                                    name="finishDate"
                                    type="date"
                                    className="form-control"
                                    value={taskData.finishDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                            <button className="btn  btn-orange-primary-edit px-5 my-4" type="submit">Add Task</button>
                        </form>
                        </div>
                        </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.body
    );
}

export default TaskModal;
