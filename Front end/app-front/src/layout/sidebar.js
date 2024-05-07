import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/" className="sidebar-item m-3     ">Home</Link>
            <Link to="/projects" className="sidebar-item m-3">Projects</Link>
            <Link to="/collaborateur" className="sidebar-item m-3">collaborateur</Link>
            
            
        </div>
    );
};

export default Sidebar;
