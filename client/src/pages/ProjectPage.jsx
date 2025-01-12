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

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/AuthContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { COUNTRIES, CATEGORIES } from "../utils/Global/GlobalVariables";
import ProjectItemSkeleton from "../components/project/skeletons/ProjectItemSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { readAcceptLanguageHeader } from "../utils/api/languageUtils";

import {
  updateCategory,
  updateCountry,
  updateStatus,
} from "../store/filterSlice";

import {
  subscribeToNewProjects,
  getSubscribedProjects,
  getDonorSubscriptions,
} from "../utils/api/project"; // Import subscription API function

import "./ProjectPage.css";

const ProjectPage = () => {
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const filterState = useSelector((state) => state.filterStore);
  const searchQuery = searchParams.get("searchQuery");
  const searchTypeQuery = searchParams.get("searchType");

  const [selectedStatus, setSelectedStatus] = useState(
    filterState.status || "Active"
  );

  const [selectedCountry, setSelectedCountry] = useState(
    filterState.country || "Vietnam"
  );

  const [selectedCategory, setSelectedCategory] = useState(
    filterState.category || "All Categories"
  );

  // eslint-disable-next-line no-unused-vars
  const [selectedRegion, setSelectedRegion] = useState(""); // State for region selection
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status
  const [loading, setLoading] = useState(false); // Track loading state
  const [subscribedProjects, setSubscribedProjects] = useState([]); // State to store subscribed projects

  const dispatch = useDispatch();
  const { data: lan } = useQuery({
    queryKey: [`language`],
    queryFn: () => readAcceptLanguageHeader(),
  });

  useEffect(() => {
    if (filterState.status === "" && lan) {
      if (lan.languageCode === "vi") {
        dispatch(updateCountry({ country: "Vietnam" }));
        setSelectedCountry("Vietnam");
      } else if (lan.languageCode === "de") {
        dispatch(updateCountry({ country: "Germany" }));
        setSelectedCountry("Germany");
      } else {
        dispatch(updateCountry({ country: "USA" }));
        setSelectedCountry("USA");
      }
    }
  }, [lan]);

  // Fetch subscribed projects for the donor when the component loads
  useEffect(() => {
    const fetchSubscribedProjects = async () => {
      const donor_id = "1"; // Replace with actual donor ID from context/session
      try {
        const fetchedSubscribedProjects = await getDonorSubscriptions(donor_id);
        console.log("Fetched Subscribed Projects:", fetchedSubscribedProjects);
        setSubscribedProjects(fetchedSubscribedProjects);
      } catch (error) {
        console.error("Failed to fetch subscribed projects:", error);
      }
    };

    fetchSubscribedProjects();
  }, []); // Empty dependency array to run once on component mount
  const { data: projects, isLoading } = useQuery({
    queryKey: [
      "read-projects",
      searchQuery,
      searchTypeQuery,
      selectedStatus,
      selectedCategory,
      selectedCountry,
    ],
    queryFn: () => {
      if (!searchQuery) {
        return getProjects(selectedStatus, selectedCategory);
      } else if (searchTypeQuery === "Project") {
        return getProjectsByProjectTitle(
          searchQuery,
          selectedStatus,
          selectedCategory,
          selectedCountry
        );
      } else {
        return getProjectsByCharityName(
          searchQuery,
          selectedStatus,
          selectedCategory,
          selectedCountry
        );
      }
    },
  });

  const onChangeCategory = (value) => {
    setSelectedCategory(value);
    setIsSubscribed(false); // Reset subscription when category changes
  };
  const onChangeCountry = (value) => {
    setSelectedCountry(value);
    setIsSubscribed(false); // Reset subscription when country changes
  };
  const onChangeStatus = (value) => {
    dispatch(updateStatus({ status: value }));
    setSelectedStatus(value);
    setIsSubscribed(false); // Reset subscription when status changes
  };
  const handleSubscription = async () => {
    if (!selectedCategory || (!selectedRegion && !selectedCountry)) {
      alert("Please select both category and region/country.");
      return;
    }
    const donor_id = "1"; // Replace with actual donor ID from context/session
    const donation_id = 3; // Example donation ID, replace with actual value
    try {
      setLoading(true); // Show loading state
      // Make the subscription API call with selected data
      await subscribeToNewProjects({
        donor_id,
        category: selectedCategory,
        region: selectedCountry, // Use region if selected, otherwise country
        donation_id,
      });
      setIsSubscribed(true); // Set to true when successfully subscribed
      alert("You have successfully subscribed!");
      // Fetch and set the list of subscribed projects
      const fetchedSubscribedProjects = await getSubscribedProjects(donor_id);
      setSubscribedProjects(fetchedSubscribedProjects);
    } catch (error) {
      console.error("Subscription failed", error);
      alert("Failed to subscribe, please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };
  return (
    <main>
      {/* Hero Section */}
      <div className="hero-section relative mb-12">
        <img
          src="https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.jpg?s=612x612&w=0&k=20&c=0fnD_g46lvoZ5NdzX5zYOSM4PzM95ezfs5uMe9D1QKs="
          alt="Charity banner"
          className="w-full h-72 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white text-center p-6 rounded-lg">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Explore Our Projects
          </h1>
          <p className="text-sm lg:text-base max-w-2xl">
            Our projects aim to make a positive impact on communities worldwide.
            Browse through a variety of initiatives focused on education,
            health, environment, and more. Your support can bring change and
            hope to those in need.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar />
      </div>
      {/* Project Status Selector */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Status Selector */}
        {user && user.user_type === "Admin" && (
          <Select value={selectedStatus} onValueChange={onChangeStatus}>
            <SelectTrigger className="w-[200px] px-4 py-2 border text-gray-300 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Project Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Halted">Halted</SelectItem>
            </SelectContent>
          </Select>
        )}

        {/* Country Selector */}
        <Select value={selectedCountry} onValueChange={onChangeCountry}>
          <SelectTrigger className="w-[200px] px-4 py-2 border text-gray-300 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500">
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
        {/* Category Selector */}
        <Select value={selectedCategory} onValueChange={onChangeCategory}>
          <SelectTrigger className="w-[200px] px-4 py-2 border text-gray-300 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select Category" />
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

      {/* Subscription Section */}
      <div className="subscription-section bg-blue-50 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Subscribe to Project Notifications
        </h3>
        <div className="flex">
          <button
            onClick={handleSubscription}
            disabled={loading || isSubscribed}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50 transition"
          >
            {loading
              ? "Subscribing..."
              : isSubscribed
              ? "Subscribed"
              : "Subscribe"}
          </button>
        </div>
      </div>

      {/* Subscribed Projects */}
      <div className="subscribed-projects mb-8">
        <h3 className="text-xl font-semibold mb-4">Your Subscribed Projects</h3>
        {subscribedProjects.length > 0 ? (
          <ul className="space-y-2">
            {subscribedProjects.map((project) => (
              <li
                key={project.subscription_id}
                className="p-3 bg-gray-100 rounded-lg shadow-md"
              >
                <strong>{project.category}</strong> - {project.region} -{" "}
                {project.created_at}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have no subscribed projects.</p>
        )}
      </div>

      {/* Loading and Project List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <ProjectItemSkeleton key={`blog-post-skeleton-${i}`} />
            ))}
        </div>
      ) : (
        projects && <ProjectList projects={projects} />
      )}
    </main>
  );
};

export default ProjectPage;
