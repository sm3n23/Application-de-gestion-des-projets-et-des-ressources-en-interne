import React from "react";
import Modal from "../Modal"; // Ensure you have a Modal component
import { Link } from "react-router-dom";

const EmployeeModal = ({ isOpen, onClose, employees, addEmployee }) => {
  const handleAddEmployee = (employee) => {
    addEmployee(employee);
    onClose(); // Close the modal after adding
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      
      
      <div className="employee-list-container">
            <div className='header'>
                <h5 className='header-txt'>Collaborateurs</h5>
            </div>
            {employees.map((employee, index) => (
            <div key={index} className="employee-item" onClick={() => handleAddEmployee(employee)}>
                    
                <div className="employee-name"><img className='picture-home mx-3' src={`../../${employee.picture}`} alt="Profile picture" />
                    {employee.name}
                </div>
                    
            </div>
            ))}
        </div>
    </Modal>
  );
};

export default EmployeeModal;
