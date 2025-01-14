import ProjectItem from "./ProjectItem";
import "./ProjectStyles.css";

const DeletedProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <div key={index}>
          <ProjectItem project={project} />
        </div>
      ))}
    </div>
  );
};

export default DeletedProjectList;
