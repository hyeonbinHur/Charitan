import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../utils/api/project";
import { readAcceptLanguageHeader } from "../utils/api/languageUtils";
import ProjectItemSkeleton from "../components/project/skeletons/ProjectItemSkeleton";
import ProjectItem from "../components/project/ProjectItem";
import "../components/project/ProjectStyles.css"; 

const MainPage = () => {
  const navigate = useNavigate();

  // Fetch user's language preferences
  const { data: lan } = useQuery({
    queryKey: ["language"],
    queryFn: () => readAcceptLanguageHeader(),
  });

  // Fetch featured projects
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => getProjects("Active", "All Categories"),
  });

  return (
    <main className="main-page">
      {/* Hero Section */}
      <section className="hero-section text-center mb-8">
        <h1 className="text-4xl font-bold">Welcome to Charitan</h1>
        <p className="text-lg text-gray-600 mt-2">
          Make a difference by supporting causes that matter.
        </p>
        {lan && (
          <p className="language-note text-gray-500 mt-1">
            Your language preference: <strong>{lan.languageCode}</strong>
          </p>
        )}
        <button
          className="button-primary mt-4"
          onClick={() => navigate("/donation")}
        >
          Donate Now
        </button>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-section">
        <div className="section-header flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <button
            className="view-all-btn"
            onClick={() => navigate("/projects")}
          >
            View All
          </button>
        </div>
        <div className="featured-projects">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => <ProjectItemSkeleton key={`skeleton-${i}`} />)
          ) : isError ? (
            <p className="text-red-500">Failed to load projects. Please try again later.</p>
          ) : (
            projects.slice(0, 3).map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default MainPage;
