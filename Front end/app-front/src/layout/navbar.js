import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [searchParams, setSearchParams] = useState({
        name: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:8080/api/projects/search?name=${searchParams.name}&startPeriod=${searchParams.startDate}&endPeriod=${searchParams.endDate}`);
        const data = await response.json();
        console.log(data);
        // Further actions based on fetched data
    };
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Navbar
                    </Link>
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
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Project Name"
                                aria-label="Search"
                                name="name"
                                value={searchParams.name}
                                onChange={handleChange}
                            />
                            <input
                                className="form-control me-2"
                                type="date"
                                name="startDate"
                                value={searchParams.startDate}
                                onChange={handleChange}
                            />
                            <input
                                className="form-control me-2"
                                type="date"
                                name="endDate"
                                value={searchParams.endDate}
                                onChange={handleChange}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <Link className="btn btn-outline-light" to="/addemployee">Add</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}
