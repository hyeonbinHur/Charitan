import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Assuming you're using Lucide icons
import "./CharityProjectPage.css";
import ProjectList from "../components/project/ProjectList";
import { useQuery } from "@tanstack/react-query";
import { getProjectsByCharity } from "../utils/api/project";
const CharityProjectsPage = () => {
  const { charity_id } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const { data: projects } = useQuery({
    queryKey: [`get-project-by-charity-${charity_id}`],
    queryFn: () => getProjectsByCharity(charity_id),
  });
  return (
    <main className="charity-projects-page">
      {/* Dropdown Button */}
      <div className="dropdown-container text-center my-4 relative">
        <button
          className="dropdown-toggle bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center"
          onClick={toggleDropdown}
        >
          Options
          <ChevronDown
            className={`ml-2 transform ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu absolute mt-2 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded py-2 w-48">
            <Link
              to={`/create-project/${charity_id}`}
              className="block px-4 py-2 hover:bg-gray-100 text-black text-sm"
            >
              Create Project
            </Link>
          </div>
        )}
      </div>
      {/* Reuse the ProjectPage layout */}
      {projects && <ProjectList projects={projects} />}
    </main>
  );
};

export default CharityProjectsPage;
