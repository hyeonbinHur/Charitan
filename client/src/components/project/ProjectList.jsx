import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router-dom";

const ProjectList = ({ projects }) => {
  const navigate = useNavigate();
  const handleNavigateToDetail = (project_id) => {
    navigate(`/project/${project_id}`);
  };
  return (
    <div>
      {projects.map((e, i) => (
        <div
          key={i}
          className="my-5"
          onClick={() => handleNavigateToDetail(e.project_id)}
        >
          <ProjectItem project={e} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
