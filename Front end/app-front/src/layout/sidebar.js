import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ employee }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-profile my-5">
        {employee && (
          <>
            <p>
              <img src={employee.picture || "/images/profile.png"} alt="Profile picture" />
            </p>
            <p>{employee.name}</p>
          </>
        )}
      </div>
      <div className="separator"></div>
      <div className="menu my-5">
        <Link to="/" className="menu-item">
          <i className="fas fa-home"></i>Home
        </Link>
        <Link to="/projects" className="menu-item">
          <i className="fa-solid fa-hammer"></i>Projets
        </Link>
        <Link to="/collaborateur" className="menu-item">
          <i className="fa-solid fa-user"></i>collaborateurs
        </Link>
      </div>
      <div className="footer">
        <div className="bottom-image">
          <img src="/images/bplogo.png" alt="Banque Populaire logo" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;