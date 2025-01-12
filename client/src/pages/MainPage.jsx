import { useNavigate } from "react-router-dom";
import "./MainPage.css"; // Styles for the page
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../utils/api/project"; // Import the API function
import { readAcceptLanguageHeader } from "../utils/api/languageUtils";
import ProjectItemSkeleton from "../components/project/skeletons/ProjectItemSkeleton";
import ProjectItem from "../components/project/ProjectItem";
import Hero from "../components/hero/Hero";

const MainPage = () => {
  const navigate = useNavigate();

  // Fetch user's language preferences
  const { data: lan } = useQuery({
    queryKey: ["language"],
    queryFn: () => readAcceptLanguageHeader(),
  });

  // Fetch projects for the homepage
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => getProjects("Active", "All Categories"),
  });

  return (
    <main
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Hero Section */}
      <Hero />
      <section className="hero-section">
        <h1>Welcome to Charitan</h1>
        <p>Make a difference by supporting causes that matter.</p>
        {lan && (
          <p className="language-note">
            Your language preference: <strong>{lan.languageCode}</strong>
          </p>
        )}
        <button
          className="button-primary"
          onClick={() => navigate("/donation")}
        >
          Donate Now
        </button>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <button
            className="view-all-btn"
            onClick={() => navigate("/projects")}
          >
            VIEW ALL
          </button>
        </div>
        {isLoading ? (
          <div className="horizontal-projects">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <ProjectItemSkeleton key={`skeleton-${i}`} />
              ))}
          </div>
        ) : isError ? (
          <p>Failed to load projects. Please try again later.</p>
        ) : (
          <div className="horizontal-projects">
            {projects.slice(0, 3).map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MainPage;
