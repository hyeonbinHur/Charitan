import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router-dom";
import './ProjectStyles.css';

const ProjectList = ({ projects }) => {
  const navigate = useNavigate();
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <div
          key={index}
          onClick={() => navigate(`/project/${project.project_id}`)}
        >
          <ProjectItem project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
