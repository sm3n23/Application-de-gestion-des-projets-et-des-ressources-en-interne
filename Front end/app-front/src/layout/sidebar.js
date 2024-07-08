import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { logout, AuthenticatedEmployee } = useContext(AuthContext);


  console.log(AuthenticatedEmployee)
  return (
    <div className="sidebar">
      <div className="sidebar-profile my-5">
        {AuthenticatedEmployee ? (
          <>
            <p>
              <img
                src={AuthenticatedEmployee.picture}
                alt="Profile picture"
                className="profile-picture"
              />
            </p>
            <p>{AuthenticatedEmployee.name}</p>
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
        <Link to="/allprojects" className="menu-item">
          <i className="fa-solid fa-hammer"></i> Projets
        </Link>
        <Link to="/collaborateur" className="menu-item">
          <i className="fa-solid fa-user"></i> Collaborateurs
        </Link>
        
        
        
        
        <div className=" btn-group menu-item mx-1">
          <button type="button" className="btn custom-btn">
            <i className="fa-solid fa-gear"></i> Settings
          </button>
          <button
            type="button"
            className="btn custom-btn dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              {AuthenticatedEmployee && (
              <Link className="dropdown-item" to={`/collaborateur/view/${AuthenticatedEmployee.id}`}>
                Profile
              </Link>
              )}
            </li>
            <li>
              <Link className="dropdown-item" to="/settings">
                Settings
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
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