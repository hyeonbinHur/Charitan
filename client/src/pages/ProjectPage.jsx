import ProjectList from "@/components/project/ProjectList";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/searchbar/SearchBar";
import {
  getProjects,
  getProjectsByCharityName,
  getProjectsByProjectTitle,
} from "../utils/api/project";
import { useEffect } from "react";

const ProjectPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const searchTypeQuery = searchParams.get("searchType");
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["read-projects", searchQuery, searchTypeQuery],
    queryFn: () => {
      if (!searchQuery) {
        console.log("here");
        return getProjects();
      } else if (searchTypeQuery === "Project") {
        console.log("project");
        return getProjectsByProjectTitle(searchQuery);
      } else {
        console.log("char");
        return getProjectsByCharityName(searchQuery);
      }
    },
  });
  useEffect(() => {
    console.log(projects);
  }, [projects]);
  return (
    <section>
      Project Page
      <SearchBar />
      {projects && <ProjectList projects={projects} />}
    </section>
  );
};

export default ProjectPage;
