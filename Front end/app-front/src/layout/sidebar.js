import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Sidebar = () => {
  const { logout, AuthenticatedEmployee } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (AuthenticatedEmployee) {
      fetchUnreadNotifications();
    }
  }, [AuthenticatedEmployee]);

  const fetchUnreadNotifications = async () => {
    try {
      let result;
      if (AuthenticatedEmployee.role === "ChefDeProjet") {
        result = await axios.get('http://localhost:8085/notifications/all');
      } else {
        result = await axios.get(`http://localhost:8085/notifications/employee/${AuthenticatedEmployee.id}`);
      }
      const unreadNotifications = result.data.filter(notification => !notification.read);
      console.log(unreadNotifications)
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };

  

  console.log(AuthenticatedEmployee);
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
        <Link to="/notification" className="menu-item notification-link">
          <i className="fa-solid fa-bell"></i> Notifications
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
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
