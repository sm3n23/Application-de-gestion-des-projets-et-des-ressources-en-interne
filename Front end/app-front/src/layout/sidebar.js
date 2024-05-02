import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/" className="sidebar-item">Home</Link>
            <Link to="/projects" className="sidebar-item">Projects</Link>
            <Link to="/collaborateur" className="sidebar-item">collaborateur</Link>
            
            {/* Add additional links as needed */}
        </div>
    );
};

export default Sidebar;
