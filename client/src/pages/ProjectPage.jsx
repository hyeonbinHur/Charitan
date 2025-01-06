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
import { COUNTRIES, CATEGORIES } from "../utils/Global/GlobalVariables";

const ProjectPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const searchTypeQuery = searchParams.get("searchType");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [selectedCountry, setSelectedCountry] = useState("Vietnam");
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "read-projects",
      searchQuery,
      searchTypeQuery,
      selectedStatus,
      selectedCategory,
    ],
    queryFn: () => {
      if (!searchQuery) {
        console.log("here");
        return getProjects(selectedStatus, selectedCategory);
      } else if (searchTypeQuery === "Project") {
        console.log("project");
        return getProjectsByProjectTitle(
          searchQuery,
          selectedStatus,
          selectedCategory
        );
      } else {
        console.log("char");
        return getProjectsByCharityName(
          searchQuery,
          selectedStatus,
          selectedCategory
        );
      }
    },
  });

  return (
    <section>
      Project Page
      <SearchBar />
      {/* project status selector */}
      <div className="flex my-3">
        <div>
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
        </div>
        {/* project country selector */}
        <div>
          <Select
            value={selectedCountry}
            onValueChange={(value) => {
              setSelectedCountry(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Project Country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((e, i) => (
                <SelectItem value={e} key={`Country-key-${i}`}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* project category selector */}
        <div>
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Project Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((e, i) => (
                <SelectItem value={e} key={`Category-key-${i}`}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {projects && <ProjectList projects={projects} />}
    </section>
  );
};

export default ProjectPage;
