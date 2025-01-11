import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects, getTopDonors } from "../utils/api/project"; // Import the new API function for top donors
import ProjectItemSkeleton from "../components/project/skeletons/ProjectItemSkeleton";
import ProjectItem from "../components/project/ProjectItem";
import "../components/project/ProjectStyles.css";
// import Hero from "../components/hero/Hero";
import MainPageImg from "../../public/main_page.jpg";

const MainPage = () => {
  const navigate = useNavigate();
  // Fetch user's language preferences

  // Fetch featured projects
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => getProjects("Active", "All Categories"),
  });

  // Fetch top donors for the current month
  const {
    data: topDonors,
    isLoading: isTopDonorsLoading,
    isError: isTopDonorsError,
  } = useQuery({
    queryKey: ["top-donors"],
    queryFn: getTopDonors, // Fetch the top donors using the API function
  });

  return (
    <main className="main-page min-h-screen">
      {/* Hero Section */}
      <section className="hero-section flex flex-col text-center py-12 bg-gradient-to-r text-gray-800">
        <img
          src={MainPageImg}
          alt="Main Page Banner"
          className="w-full max-h-96 object-cover mb-6 rounded-md"
        />
        <p className="text-4xl mt-4 font-semibold">Welcome to Charitan</p>

        <p className="text-lg mt-4">
          Make a difference by supporting causes that matter.
        </p>
      </section>

      {/* Top Donors Section */}
      <section className="top-donors-section py-12 bg-gray-100">
        <div className="section-header text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Top Donors of the Month
          </h2>
        </div>
        {isTopDonorsLoading ? (
          <p className="text-center text-gray-600">Loading top donors...</p>
        ) : isTopDonorsError ? (
          <p className="text-center text-red-500">
            Failed to load top donors. Please try again later.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {topDonors && topDonors.donor_id ? (
              <div
                key={topDonors.donor_id}
                className="card bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl text-gray-500">{topDonors.name}</h3>
                <p className="mt-2 text-gray-600">
                  Total Donations:{" "}
                  <span className="font-semibold text-gray-500">
                    {topDonors.total_amount}
                  </span>
                </p>
                <p className="text-gray-500">
                  Donation Count: <span>{topDonors.donation_count || 0}</span>
                </p>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No top donors to display.
              </p>
            )}
          </div>
        )}
      </section>

      {/* Featured Projects Section */}
      <section className="featured-section py-12">
        <div className="section-header flex justify-between items-center mb-8 px-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Recent Projects
          </h2>
          <button
            className="view-all-btn px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => navigate("/projects")}
          >
            VIEW ALL
          </button>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => <ProjectItemSkeleton key={`skeleton-${i}`} />)
          ) : isError ? (
            <p className="text-red-500">
              Failed to load projects. Please try again later.
            </p>
          ) : (
            projects
              .slice(0, 3)
              .map((project) => (
                <ProjectItem
                  key={`recent-project-${project.project_id}`}
                  project={project}
                />
              ))
          )}
        </div>
      </section>
    </main>
  );
};

export default MainPage;
