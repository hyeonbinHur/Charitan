import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/utils/api/charityProject";
import CharityProjectItem from "./CharityProjectItem";
import { useNavigate } from "react-router-dom";

const CharityProjectList = () => {
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
            <CharityProjectItem project={e} />
          </div>
        ))}
    </div>
  );
};

export default CharityProjectList;
