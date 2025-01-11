import './ProjectStyles.css';


const date = "This text will be uppercase";

const ProjectItem = ({ project }) => {
  return (
    <div className="project-item">
      <div className="project-thumbnail">
        <img
          src={project.thumbnail}
          alt={`Project thumbnail: ${project.title}`}
          loading="lazy"
        />
      </div>
      <div className="project-details">
        <h2>{project.title}</h2>
        <p className="project-category"><strong>Category: </strong>{project.category}</p>
        <p className="project-description"><strong>Description:</strong><br /> {project.description}</p>
        <p className="project-date"><strong>Created on: </strong>{project.created_at}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
