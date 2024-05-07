import React from 'react';
import './Table.css'; 
import { Link } from 'react-router-dom';

const EmployeeTable = ({employees}) => {
    const randomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    };
    return (
        <div className="container">
            <div className="table-container">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Signup time</th>
                            <th>Affiliate</th>
                            <th>Status</th>
                            <th>Tags</th>
                            <th>Balance, EUR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee)=>(
                            <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td><span className="tag" style={{ backgroundColor: randomColor() }}>{employee.projectName} </span></td>
                            <td>May 14, 2020, 12:45:57</td>
                            <td>Rens Erkens</td>
                            <td>
                                <span className="status-circle" style={{backgroundColor: 'red'}}></span> Declined
                            </td>
                            <td>
                                {Array.isArray(employee.tasks) ? employee.tasks.map((task, index)=>(
                                    <span key={index} className="tag" style={{ backgroundColor: randomColor() }}>{task}</span>
                                )): <span className="tag" style={{ backgroundColor: randomColor() }}>{"No Tasks Assigned"}</span>} 
                                
                            </td>
                            <td>
                                <Link className='btn btn-sm btn-outline-info mx-2 px-3' to={`/collaborateur/edit/${employee.id}`}>Edit</Link>
                                <Link className='btn btn-sm btn-outline-danger ' to={`/collaborateur/delete/${employee.id}`}>Delete</Link>
                            </td>
                        </tr>
                        ))}
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
