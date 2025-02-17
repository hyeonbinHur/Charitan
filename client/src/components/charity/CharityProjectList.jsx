import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectsByCharity } from "../../utils/api/charity";
import ProjectItem from "../project/ProjectItem";
import { useNavigate } from "react-router-dom";

const CharityProjectList = ({ chairty_id }) => {
  const { data: projects } = useQuery({
    queryKey: [`get-project-by-charity-${chairty_id}`],
    queryFn: () => getProjectsByCharity(chairty_id),
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  const handleNavigateToDetail = (charityId) => {
    navigate(`/project/${charityId}`);
  };
  return (
    <div>
      {projects &&
        projects.map((e, i) => (
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

export default CharityProjectList;
