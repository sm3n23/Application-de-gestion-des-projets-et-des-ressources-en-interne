import React from 'react';

const EmployeeList = ({ employees }) => {
    return (
        <div className="employee-list-container">
            {employees.map((employee, index) => (
                <div key={index} className="employee-item">
                    <div className="employee-name">{employee.name}</div>
                    
                </div>
            ))}
        </div>
    );
};

export default EmployeeList;
