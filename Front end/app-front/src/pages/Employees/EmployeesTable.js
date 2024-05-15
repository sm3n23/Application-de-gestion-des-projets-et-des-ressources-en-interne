import React, { useState } from "react";
import "./Table.css";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeTable = ({ employees, setEmployees }) => {
  const darkColors = [
    "#8B0000", // Dark Red
    "#006400", // Dark Green
    "#00008B", // Dark Blue
    "#800080", // Dark Purple
    "#FF8C00", // Dark Orange
    "#2F4F4F", // Dark Slate Gray
    "#8B008B", // Dark Magenta
    "#9932CC", // Dark Orchid
    "#8B4513", // Saddle Brown
    "#556B2F", // Dark Olive Green
  ];

  const getRandomCommonColor = () => {
    const randomIndex = Math.floor(Math.random() * darkColors.length);
    return darkColors[randomIndex];
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
            {Array.isArray(employees) &&employees.length>0 ? (employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>
                  <span
                    className="tag"
                    style={{ backgroundColor: getRandomCommonColor() }}
                  >
                    {employee.projectName}{" "}
                  </span>
                </td>
                <td>May 14, 2020, 12:45:57</td>
                <td>Rens Erkens</td>
                <td>
                  <span
                    className="status-circle"
                    style={{ backgroundColor: "red" }}
                  ></span>{" "}
                  Declined
                </td>
                <td>
                  {Array.isArray(employee.tasks) ? (
                    employee.tasks.map((task, index) => (
                      <span
                        key={index}
                        className="tag"
                        style={{ backgroundColor: getRandomCommonColor() }}
                      >
                        {task}
                      </span>
                    ))
                  ) : (
                    <span
                      className="tag"
                      style={{ backgroundColor: getRandomCommonColor() }}
                    >
                      {"No Tasks Assigned"}
                    </span>
                  )}
                </td>
                <td>
                  <Link
                    className="btn btn-sm btn-outline-info mx-2 px-3"
                    to={`/collaborateur/edit/${employee.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger "
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
