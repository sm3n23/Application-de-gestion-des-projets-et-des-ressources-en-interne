import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProjectsTable from './ProjectsTable';

export default function ProjectPage() {
    const [projects,setProjects] = useState([]);


    useEffect(()=>{
      loadProjects();
    },[])

    const processProjects = (projects) => {
      return projects.map(project => {
          const employees = project.employees.map(emp => emp.name);
          const tasks = project.taches.map(task => task.name);
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
      <ProjectsTable projects={projects}/>
    </div>
  )
}
