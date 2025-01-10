import { useNavigate } from "react-router-dom";
import "./MainPage.css"; // Styles for the page
import { useQuery } from "@tanstack/react-query";
import { getProjects, getTopDonors } from "../utils/api/project"; // Import the new API function for top donors
import { readAcceptLanguageHeader } from "../utils/api/languageUtils";
import ProjectItemSkeleton from "../components/project/skeletons/ProjectItemSkeleton";
import ProjectItem from "../components/project/ProjectItem";

const MainPage = () => {
  const navigate = useNavigate();

  // Fetch user's language preferences
  const { data: lan } = useQuery({
    queryKey: ["language"],
    queryFn: () => readAcceptLanguageHeader(),
  });

  // Fetch projects for the homepage
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => getProjects("Active", "All Categories"),
  });

  // Fetch top donors for the current month
  const { data: topDonors, isLoading: isTopDonorsLoading, isError: isTopDonorsError } = useQuery({
    queryKey: ["top-donors"],
    queryFn: getTopDonors, // Fetch the top donors using the API function
  });

  // Log the data to verify it's being fetched correctly
  console.log("Top Donors Data:", topDonors);

  return (
    <main style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Charitan</h1>
        <p>Make a difference by supporting causes that matter.</p>
        {lan && (
          <p className="language-note">
            Your language preference: <strong>{lan.languageCode}</strong>
          </p>
        )}
        <button className="button-primary" onClick={() => navigate("/donation")}>
          Donate Now
        </button>
      </section>

      {/* Top Donors Section */}
      <section className="top-donors-section">
        <div className="section-header">
          <h2>Top Donors of the Month</h2>
        </div>
        {isTopDonorsLoading ? (
          <p>Loading top donors...</p>
        ) : isTopDonorsError ? (
          <p>Failed to load top donors. Please try again later.</p>
        ) : (
          <div className="grid">
            {/* Check if topDonors is an object and then display it */}
            {topDonors && topDonors.donor_id ? (
              <div key={topDonors.donor_id} className="card">
                <h3>{topDonors.name}</h3>
                <p>Total Donations: ${topDonors.total_amount}</p>
                <p>Donation Count: {topDonors.donation_count || 0}</p>
              </div>
            ) : (
              <p>No top donors to display.</p>
            )}
          </div>
        )}
      </section>


      {/* Featured Projects Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <button className="view-all-btn" onClick={() => navigate("/projects")}>
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
