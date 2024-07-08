import React, { useState } from "react";
import Modal from "../Modal"; // Ensure you have a Modal component
import { Link } from "react-router-dom";

const EmployeeModal = ({ isOpen, onClose, employees, addEmployee, projectEmployees }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const availableEmployees = employees.filter(
    (employee) => !projectEmployees.some((projEmp) => projEmp.id === employee.id)
  );

  const handleAddEmployee = (employee) => {
    console.log("Adding employee:", employee);
    addEmployee(employee);
    onClose(); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = availableEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="search-bar-modal">
        <input
          type="text"
          placeholder="recherche"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control my-3"
        />
      </div>
      <div className="employee-project-list-container">
        <div className="header">
          <h5 className="header-txt">Ajouter Collaborateurs</h5>
        </div>
        {filteredEmployees.map((employee, index) => (
          <div
            key={index}
            className="employee-item"
            onClick={() => handleAddEmployee(employee)}
          >
            <div className="employee-name">
              <img
                className="picture-home mx-3"
                src={`../../${employee.picture}`}
                alt="Profile picture"
              />
              {employee.name}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};


export default EmployeeModal;
