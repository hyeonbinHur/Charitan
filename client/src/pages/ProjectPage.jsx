// @ts-nocheck
import ProjectList from "../components/project/ProjectList";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/searchbar/SearchBar";
import {
  getProjects,
  getProjectsByCharityName,
  getProjectsByProjectTitle,
} from "../utils/api/project";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const ProjectPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const searchTypeQuery = searchParams.get("searchType");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["read-projects", searchQuery, searchTypeQuery, selectedStatus],
    queryFn: () => {
      if (!searchQuery) {
        console.log("here");
        return getProjects(selectedStatus);
      } else if (searchTypeQuery === "Project") {
        console.log("project");
        return getProjectsByProjectTitle(searchQuery, selectedStatus);
      } else {
        console.log("char");
        return getProjectsByCharityName(searchQuery, selectedStatus);
      }
    },
  });

  return (
    <section>
      Project Page
      <SearchBar />
      <Select
        value={selectedStatus}
        onValueChange={(value) => {
          setSelectedStatus(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Project Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Halted">Halted</SelectItem>
        </SelectContent>
      </Select>
      {projects && <ProjectList projects={projects} />}
    </section>
  );
};

export default ProjectPage;
