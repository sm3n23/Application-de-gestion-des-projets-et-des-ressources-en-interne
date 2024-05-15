import React from 'react';
import './Profile.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div className="container-p profile-page">
            <div className="header">
                <Link to="/collaborateur"><i className="fa fa-arrow-left"></i> Back</Link>
                <button><i className="fa fa-share-alt"></i> Share Profile</button>
            </div>
            <div className="profile">
                <div className="profile-left">
                    <img src="https://placehold.co/120x120" alt="Profile of Ananya Grover" />
                    <h2>Ananya Grover</h2>
                    <p>UI/UX Designer</p>
                    <p className="description">
                        Full stack product designer with hands-on experience in solving problems for clients ranging from Real Estate, Hospitality, Rentals, On Demand Healthcare, IT Services & Social Network among others. I've good communication skills, well-defined process for engagement, a toolkit for collaboration & a user-centered approach to design.
                    </p>
                    <div className="skills">
                        <button>User Interface Designing</button>
                        <button>UX</button>
                        <button>UI</button>
                        <button>Adobe XD</button>
                        <button>Mobile Apps</button>
                        <button>User Research</button>
                        <button>Wireframing</button>
                        <button>Information Architecture</button>
                    </div>
                    <div className="add-notes">
                        <textarea rows="4" placeholder="Add notes for future reference"></textarea>
                        <button>Add Note</button>
                    </div>
                </div>
                <div className="profile-right">
                    <div className="section basic-info row">
                        <h3>Basic Information</h3>
                        <div className="info-item mb-4">
                            <p className='col-lg-4 '><strong>AGE <span>28 years</span></strong></p>
                            <p className='col-lg-4'><strong>YEARS OF EXPERIENCE <span>6 years</span></strong></p>
                            <p className='col-lg-4'><strong>PHONE <span>+91 98123 55679</span></strong></p>
                            

                        </div>
                        <div className="info-item">
                        <p className='col-lg-4'><strong>CTC <span>12.5 Lac</span></strong></p>
                            <p className='col-lg-4'><strong>LOCATION <span> Ahmedabad, Gujarat</span></strong></p>
                            <p className='col-lg-4'><strong>EMAIL <span>anayasharma@gmail.com</span></strong></p>
                            
                        </div>
                        
                        <div className="buttons">
                            <button>Download Resume</button>
                            <button>Send Email</button>
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
                    <div className="section education">
                        <h3>Education</h3>
                        <p>...</p>
                    </div>
                    <div className="section accomplishments">
                        <h3>Accomplishments</h3>
                        <p>...</p>
                    </div>
                    <div className="section certification">
                        <h3>Certification</h3>
                        <p>...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
