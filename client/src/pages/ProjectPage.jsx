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
import ProjectItemSkeleton from "../components/project/skeletons/ProjectItemSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { readAcceptLanguageHeader } from "../utils/api/languageUtils";
import {
  updateCategory,
  updateCountry,
  updateStatus,
} from "../store/filterSlice";
import { subscribeToNewProjects, getSubscribedProjects, getDonorSubscriptions } from "../utils/api/project"; // Import subscription API function
import "./ProjectPage.css";

const ProjectPage = () => {
  const [searchParams] = useSearchParams();
  const filterState = useSelector((state) => state.filterStore);
  const searchQuery = searchParams.get("searchQuery");
  const searchTypeQuery = searchParams.get("searchType");
  const [selectedStatus, setSelectedStatus] = useState(filterState.status || "Active");
  const [selectedCountry, setSelectedCountry] = useState(filterState.country || "Vietnam");
  const [selectedCategory, setSelectedCategory] = useState(filterState.category || "All Categories");
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
      const donor_id = "1";  // Replace with actual donor ID from context/session
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

  if (isLoading) {
    console.log("loading");
  }

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

    const donor_id = "1";  // Replace with actual donor ID from context/session
    const donation_id = 3;  // Example donation ID, replace with actual value

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
      console.log("Fetched Subscribed Projects:", fetchedSubscribedProjects);
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
      <div className="hero-section">
        <img
          src="https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.jpg?s=612x612&w=0&k=20&c=0fnD_g46lvoZ5NdzX5zYOSM4PzM95ezfs5uMe9D1QKs="
          alt="Charity banner"
          className="hero-image"
        />
        <div className="hero-description">
          <h1>Explore Our Projects</h1>
          <p>
            Our projects aim to make a positive impact on communities worldwide.
            Browse through a variety of initiatives focused on education, health,
            environment, and more. Your support can bring change and hope to those in
            need.
          </p>
        </div>
      </div>

      <SearchBar />
      {/* project status selector */}
      <div className="flex my-3">
        <div>
          <Select value={selectedStatus} onValueChange={onChangeStatus}>
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
          <Select value={selectedCountry} onValueChange={onChangeCountry}>
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

        {/* Category selection */}
        <div>
          <Select value={selectedCategory} onValueChange={onChangeCategory}>
            <SelectTrigger className="w-[180px]">
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
      </div>

      {/* Subscription Section */}
      <div className="subscription-section my-4">
        <h3>Subscribe to Project Notifications</h3>
        <div className="flex my-3">
          <button
            onClick={handleSubscription}
            disabled={loading || isSubscribed}
            className="px-4 py-2 bg-blue-500 text-white disabled:opacity-50"
          >
            {loading ? "Subscribing..." : isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>

      {/* Display Subscribed Projects */}
      <div className="subscribed-projects">
        <h3>Your Subscribed Projects</h3>
        {subscribedProjects.length > 0 ? (
          <div>
            <ul>
              {subscribedProjects.map((project) => (
                <li key={project.subscription_id}>
                  <strong>{project.category}</strong> - {project.region} - {project.created_at}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>You have no subscribed projects.</p>
        )}
      </div>

      {/* Loading and Project List */}
      {isLoading ? (
        <div>
          {Array(7)
            .fill(0)
            .map((e, i) => (
              <ProjectItemSkeleton key={`blog-post-skeleton-${i}`} />
            ))}
        </div>
      ) : (
        <div>{projects && <ProjectList projects={projects} />}</div>
      )}
    </main>
  );
};

export default ProjectPage;
