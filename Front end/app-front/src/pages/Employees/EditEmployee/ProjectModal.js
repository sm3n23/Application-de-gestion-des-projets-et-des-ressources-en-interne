import React from "react";
import Modal from "../../Projects/Modal"; // Ensure you have a Modal component

const ProjectModal = ({ isOpen, onClose, projects, addProject }) => {
  const handleAddProject = (project) => {
    addProject(project);
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h4>Choose a project</h4>
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => handleAddProject(project)}>
            {project.name}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default ProjectModal;
