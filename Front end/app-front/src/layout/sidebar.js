import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { logout, AuthenticatedEmployee } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="sidebar-profile my-5">
        {AuthenticatedEmployee ? (
          <>
            <p><img src="/images/profile.png" alt="Profile picture" /></p>
            <p>{AuthenticatedEmployee.name}</p>
            <p>{AuthenticatedEmployee.email}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="separator"></div>
      <div className="menu my-5">
        <Link to="/" className="menu-item">
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/projects" className="menu-item">
          <i className="fa-solid fa-hammer"></i> Projets
        </Link>
        <Link to="/collaborateur" className="menu-item">
          <i className="fa-solid fa-user"></i> Collaborateurs
        </Link>
        <button onClick={logout} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Logout</button>
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
