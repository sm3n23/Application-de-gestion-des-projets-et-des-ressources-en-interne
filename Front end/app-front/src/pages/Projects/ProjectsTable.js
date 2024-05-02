import React from "react";
import "./project.css";

const ProjectTable = ({ projects }) => {
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
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>Germany</td>
                <td>May 14, 2020, 12:45:57</td>
                <td>
                    {project.employees.map((employee,index)=>(
                        <span key={index} className="tag" style={{ backgroundColor: randomColor() }}>{employee}</span>
                    ))}
                </td>
                <td>
                  <span
                    className="status-circle"
                    style={{
                      backgroundColor:
                        project.status === "On Going"
                          ? "green"
                          : project.status === "Not Started"
                          ? "red"
                          : "orange",
                    }}
                  ></span>{" "}
                  {project.status}
                </td>
                <td>
                    {project.tasks.map((task,index)=>(
                        <span key={index} className="tag" style={{ backgroundColor: randomColor() }}>{task}</span>
                    ))}
                  
                </td>
                <td>23,400</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
