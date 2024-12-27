import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/utils/api/charityProject";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getProjects"],
    queryFn: () => getProjects(),
  });

  const navigate = useNavigate();

  const handleNavigateToDetail = (projectId) => {
    navigate(`/project/${projectId}`);
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

export default ProjectList;
