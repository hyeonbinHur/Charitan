import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProjects, getTopDonors } from "../utils/api/project"; // Import the new API function for top donors

import { readAcceptLanguageHeader } from "../utils/api/languageUtils";
import ProjectItemSkeleton from "../components/project/skeletons/ProjectItemSkeleton";
import ProjectItem from "../components/project/ProjectItem";

import "../components/project/ProjectStyles.css"; 

import Hero from "../components/hero/Hero";


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

  // Fetch top donors for the current month
  const { data: topDonors, isLoading: isTopDonorsLoading, isError: isTopDonorsError } = useQuery({
    queryKey: ["top-donors"],
    queryFn: getTopDonors, // Fetch the top donors using the API function
  });

  // Log the data to verify it's being fetched correctly
  console.log("Top Donors Data:", topDonors);

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
        <div className="section-header flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Featured Projects</h2>

          <button
            className="view-all-btn"
            onClick={() => navigate("/projects")}
          >

            VIEW ALL
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
