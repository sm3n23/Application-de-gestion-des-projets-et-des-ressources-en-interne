import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const result = await axios.get("http://localhost:8085/employees");
    console.log(result.data);
    setEmployees(result.data);
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:8085/employees/${id}`);
    loadEmployees();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table class="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Project associated</th>
            </tr>
          </thead>
          <tbody>
        {employees.map((employee, index) => (
          <tr key={employee.id}>
            <th scope="row">{index + 1}</th>
            <td>{employee.name}</td>
            <td>
              {employee.projects && employee.projects.length > 0 ? (
                <ul>
                  {employee.projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                  ))}
                </ul>
              ) : (
                "No projects"
              )}
            </td>
            <td>
              <Link className="btn btn-primary mx-2" to={`/viewemployee/${employee.id}`}>
                View
              </Link>
              <Link className="btn btn-outline-primary mx-2" to={`/editemployee/${employee.id}`}>
                Edit
              </Link>
              <button className="btn btn-danger mx-2" onClick={() => deleteEmployee(employee.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
        </table>
      </div>
    </div>
  );
}
