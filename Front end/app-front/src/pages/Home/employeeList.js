import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = ({ employees }) => {
    return (
        <div className="employee-list-container">
            <div className='header'>
                <h5 className='header-txt'>Collaborateurs</h5>
                <Link to="/collaborateur" className="view-all-link">View All</Link>

            </div>
            {employees.map((employee, index) => (
            <div key={index} className="employee-item">
                    
                <Link to={`/collaborateur/view/${employee.id}`} className="employee-name"><img className='picture-home mx-3' src={employee.picture} alt="Profile picture" />
                    {employee.name}
                </Link>
                    
            </div>
            ))}
        </div>
    );
};

export default EmployeeList;
