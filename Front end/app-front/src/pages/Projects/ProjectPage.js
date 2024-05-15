import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProjectsTable from './ProjectsTable';
import { useNavigate, Link } from 'react-router-dom';
import './project.css'
export default function ProjectPage() {
    const [projects,setProjects] = useState([]);


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
    
  return (
    <div className='container'>
      <div className="d-flex justify-content-end my-1">
        <Link to="/projects/add" className="btn btn-primary btn-orange mx-3" >
        <i className="fas fa-circle-plus"></i> Add Project
        </Link>
      </div>
      <ProjectsTable projects={projects} setProjects={setProjects}/>
    </div>
  )
}
