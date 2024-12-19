import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/utils/api/charityProject";
import CharityProjectItem from "./CharityProjectItem";

const CharityProjectList = () => {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getProjects"],
    queryFn: () => getProjects(),
  });

  return (
    <div>
      {projects && projects.map((e, i) => <CharityProjectItem key={i} />)}
    </div>
  );
};

export default CharityProjectList;
