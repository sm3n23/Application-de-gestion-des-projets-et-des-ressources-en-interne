import React from "react";
import Modal from "../Modal"; // Ensure you have a Modal component

const EmployeeModal = ({ isOpen, onClose, employees, addEmployee }) => {
  const handleAddEmployee = (employee) => {
    addEmployee(employee);
    onClose(); // Close the modal after adding
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h4>Choose an Employee</h4>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id} onClick={() => handleAddEmployee(employee)}>
            {employee.name}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default EmployeeModal;
