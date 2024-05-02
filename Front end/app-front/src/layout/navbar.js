import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [searchName, setSearchName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?name=${searchName}`);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Project Tracker</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search projects by name"
                                aria-label="Search"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}
