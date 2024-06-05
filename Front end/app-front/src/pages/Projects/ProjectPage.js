import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProjectsTable from './ProjectsTable';
import { useNavigate, Link } from 'react-router-dom';
import './project.css'
export default function ProjectPage() {
    const [projects,setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(()=>{
      loadProjects();
    },[])

    const processProjects = (projects) => {
      return projects.map(project => {
        const employees = project.employees ? project.employees.map(emp => emp.name) : [];
        const tasks = project.taches ? project.taches.map(task => task.name) : [];
        return {
          ...project,
          employees,
          tasks
        };
      });
    };
    

    const loadProjects = async ()=>{
      const result = await axios.get('http://localhost:8085/projects');
      const processedProjects = processProjects(result.data);
      setProjects(processedProjects);
    }

    console.log(projects) 
    
    const handleSearchChange = (e) =>{
      setSearchTerm(e.target.value)
    }

    const filteredProjects = projects.filter((project)=>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className='container'>
      <div className='row'>
      <div className="search-bar">
        <input
          type="text"
          placeholder="recherche"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control my-3"
        />
      </div>
      </div>
      
      <div className="d-flex justify-content-end">
        <Link to="/projects/add" className="btn btn-primary btn-orange mx-3" >
        <i className="fas fa-circle-plus"></i> Ajouter Projet
        </Link>
      </div>
      <ProjectsTable projects={filteredProjects} setProjects={setProjects}/>
    </div>
  )
}
