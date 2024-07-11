// HolidayRequestForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const HolidayRequestForm = ({ onClose }) => {
  const { AuthenticatedEmployee } = useContext(AuthContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8085/holiday-requests', {
        employee: { id: AuthenticatedEmployee.id },
        startDate,
        endDate,
      });

      await axios.post('http://localhost:8085/notifications/create', {
        message: `Demande de congé de ${AuthenticatedEmployee.name} du ${startDate} au ${endDate}`,
        employeeId: AuthenticatedEmployee.id, // Assuming the ChefDeProjet ID is known
      });
      
      alert('Holiday request submitted');
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting holiday request', error);
      alert('Failed to submit holiday request');
    }
  };

  return (
    <div className="modal-overlay">
            <div className="modal-conge">
                
                <span className="modal-close-button" onClick={onClose}><i className=" fa-sharp fa-solid fa-circle-xmark"></i></span>
                <div className="">
                    <div className="form-box-modal">
                        <form onSubmit={handleSubmit}>
                        
                        
                        <div className="flex-container my-5">
                            <div className="form-group">
                                <label className="form-label" for="startDate">Date De début:</label>
                                <input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            
                        </div>
                        <div className="flex-container my-5">
                        <div className="form-group">
                                <label className="form-label" for="finishDate">Date de Fin:</label>
                                <input
                                    id="finishDate"
                                    name="finishDate"
                                    type="date"
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                            
                        </div>
                        
                            <button className="btn  btn-orange-primary-edit px-5 my-4" type="submit">Demander</button>
                        </form>
                        </div>
                        </div>
            </div>
        </div>
    
  );
};

export default HolidayRequestForm;
