import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const Profile = () => {
    const { id } = useParams();
    const { AuthenticatedEmployee } = useContext(AuthContext);
    const [employee, setEmployee] = useState({
        name: '',
        title: '',
        skills: [],
        description: '',
        birthDate: '',
        experience: '',
        phoneNumber: '',
        email: '',
        location: '',
        picture: '',
        projectId: null,
        tachesIds: []
    });

    useEffect(() => {
        loadEmployee();
    }, [id]);

    const loadEmployee = async () => {
        try {
            const res = await axios.get(`http://localhost:8085/employees/${id}`);
            setEmployee(res.data);
        } catch (error) {
            console.error("Error loading employee data:", error);
        }
    };

    console.log(employee)

    

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDifference = today.getMonth() - birthDateObj.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="container-p profile-page">
            <div className="header">
                <Link to="/collaborateur"><i className="fa fa-arrow-left"></i> Back</Link>
                {AuthenticatedEmployee && AuthenticatedEmployee.id === employee.id && (
                    <Link to={`/collaborateur/modifierdetails/${employee.id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                )}
            </div>
            <div className="profile">
                <div className="profile-left">
                    <img src={`../../${employee.picture}`} alt="Profile"  />
                    <h2 className=''>{employee.name}</h2>
                    <p>{employee.title}</p>
                    <p className="description">
                        {employee.description}
                    </p>
                    <div className="skills">
                        <span className='mx-2'>Skills</span>
                        <div>
                            {employee.skills.map((skill, index) =>
                                <button key={index}>{skill}</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="profile-right">
                    <div className="section basic-info row">
                        <h3>Basic Information</h3>
                        <div className="info-item mb-4">
                            <p className='col-lg-4'><strong>AGE <span>{calculateAge(employee.birthDate)}</span></strong></p>
                            <p className='col-lg-4'><strong>YEARS OF EXPERIENCE <span>{employee.experience}</span></strong></p>
                            <p className='col-lg-4'><strong>PHONE <span>{employee.phoneNumber}</span></strong></p>
                        </div>
                        <div className="info-item">
                            <p className='col-lg-4'><strong>LOCATION <span>{employee.location}</span></strong></p>
                            <p className='col-lg-4'><strong>EMAIL <span>{employee.email}</span></strong></p>
                        </div>
                    </div>
                    <div className="section experience">
                        <h3>Experience</h3>
                        <ul className="experience-list">
                            <li>
                                <div className="circle infosys">ST</div>
                                <div>
                                    <p><strong>Infosys</strong></p>
                                    <p>Product & UI/UX Designer</p>
                                    <p>Apr 2018 - Present | Pune, India</p>
                                </div>
                            </li>
                            <li>
                                <div className="circle pixel-studio">PS</div>
                                <div>
                                    <p><strong>Pixel Studio</strong></p>
                                    <p>UI/UX Designer</p>
                                    <p>Oct 2016 - July 2016 | Bengaluru, India</p>
                                </div>
                            </li>
                            <li>
                                <div className="circle ramotion-studio">RS</div>
                                <div>
                                    <p><strong>Ramotion Studio</strong></p>
                                    <p>Web Designer</p>
                                    <p>April 2015 - July 2016 | Bengaluru, India</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
