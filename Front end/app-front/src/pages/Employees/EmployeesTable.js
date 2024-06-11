import React, { useContext, useState } from "react";
import "./Table.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const EmployeeTable = ({ employees, setEmployees }) => {
  const {AuthenticatedEmployee} = useContext(AuthContext);
  const greyColors = ["#808080"];
  const greenColors = ["#008000", "#228B22", "#4F7942"];

  const getRandomCommonColorGrey = () => {
    const randomIndex = Math.floor(Math.random() * greyColors.length);
    return greyColors[randomIndex];
  };

  const getRandomCommonColorGreen = () => {
    const randomIndex = Math.floor(Math.random() * greenColors.length);
    return greenColors[randomIndex];
  };
  const deleteEmployee = async (id) => {
    try {
      axios.delete(`http://localhost:8085/employees/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again.");
    }
  };
  employees.map((employee)=>{
    console.log(employee)
  })
  return (
    <div className="container">
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th className="p-4">Collaborateur</th>
              <th className="p-4">Projet</th>
              
              <th className="p-4">Tâches</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employees) && employees.length >0 ? (employees.map((employee) => (
              <tr key={employee.id}>
                <td><img className='picture-home mx-3' src={employee.picture} alt="Profile picture" /></td>
                <td className="p-4"> <strong> {employee.name}</strong></td>
                <td className="p-4 name-column ">
                  <span
                    className="tag p-2"
                    style={{ backgroundColor: getRandomCommonColorGrey() }}
                  >
                    {employee.projectName}{" "}
                  </span>
                </td>
                
                
                <td className="p-4">
                  {Array.isArray(employee.tasks) ? (
                    employee.tasks.map((task, index) => (
                      <span
                        key={index}
                        className="tag m-1 p-1"
                        style={{ backgroundColor: getRandomCommonColorGreen() }}
                      >
                        {task}
                      </span>
                    ))
                  ) : (
                    <span
                      className="tag"
                      style={{ backgroundColor: getRandomCommonColorGreen() }}
                    >
                      {"No Tasks Assigned"}
                    </span>
                  )}
                </td>
                <td className="p-4">
                <Link
                    className="btn-orange-outline-table btn btn-sm"
                    to={`/collaborateur/view/${employee.id}`}
                  >
                    <i class="fa-solid fa-eye"></i>
                  </Link>
                  
                  {AuthenticatedEmployee && AuthenticatedEmployee.role === "RH" && (
                  <button
                    className="btn btn-sm btn-orange-primary-table"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  )}
                </td>
              </tr>
            ))):(
                <tr>
                  <td colSpan="8" className="text-center">
                  Pas des collaborateurs disponibles.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
