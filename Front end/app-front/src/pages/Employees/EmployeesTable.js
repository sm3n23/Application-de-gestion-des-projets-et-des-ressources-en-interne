import React, { useState } from "react";
import "./Table.css";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeTable = ({ employees, setEmployees }) => {
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
  return (
    <div className="container">
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th className="p-4">Collaborateur</th>
              <th className="p-4">Projet</th>
              
              <th className="p-4">Taches</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employees) &&employees.length>0 ? (employees.map((employee) => (
              <tr key={employee.id}>
                <td><img className='picture-home mx-3' src={employee.picture} alt="Profile picture" /></td>
                <td className="p-4"> <strong> {employee.name}</strong></td>
                <td className="p-4">
                  <span
                    className="tag"
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
                        className="tag"
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
                    className="btn-orange-view btn btn-sm"
                    to={`/collaborateur/view/${employee.id}`}
                  >
                    <i class="fa-solid fa-eye"></i>
                  </Link>
                  <Link
                    className="btn btn-sm  btn-orange-outline mx-4"
                    to={`/collaborateur/edit/${employee.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-orange-primary px-3"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))):(
                <tr>
                  <td colSpan="8" className="text-center">
                    No employees available.
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
