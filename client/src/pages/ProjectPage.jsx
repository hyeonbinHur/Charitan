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
import { subscribeToNewProjects } from "../utils/api/project"; // Added API call for subscription

const ProjectPage = () => {
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

  const [selectedRegion, setSelectedRegion] = useState(""); // New state for region
  const [isSubscribed, setIsSubscribed] = useState(false); // New state to track subscription

  const dispatch = useDispatch();

  const { data: lan } = useQuery({
    queryKey: [`language`],
    queryFn: () => readAcceptLanguageHeader(),
  });

  useEffect(() => {
    console.log(filterState);
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
    dispatch(updateCategory({ category: value }));
    setSelectedCategory(value);
  };

  const onChangeCountry = (value) => {
    dispatch(updateCountry({ country: value }));
    setSelectedCountry(value);
  };

  const onChangeStatus = (value) => {
    dispatch(updateStatus({ status: value }));
    setSelectedStatus(value);
  };

  // Subscription handler
  const handleSubscription = async () => {
    const donor_id = "user_donor_id";  // Replace with actual donor_id (e.g., from user context)
    const donation_id = 3;  // Example donation ID, replace with actual if needed

    try {
      // Call the backend function to subscribe
      await subscribeToNewProjects({ donor_id, category: selectedCategory, region: selectedRegion, donation_id });
      setIsSubscribed(true); // Mark as subscribed
    } catch (error) {
      console.error("Subscription failed", error);
    }
  };

  return (
    <main>
      <SearchBar />
      {/* Subscription Section */}
      <div>
        <h3>Subscribe to Project Notifications</h3>
        <div className="flex">
          {/* Category selection */}
          <Select value={selectedCategory} onValueChange={onChangeCategory}>
            <SelectTrigger>
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

          {/* Region selection */}
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="south">South</SelectItem>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="west">West</SelectItem>
            </SelectContent>
          </Select>

          <button onClick={handleSubscription} disabled={isSubscribed}>
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>

      {/* project status selector */}
      <div className="flex my-3">
        <div>
          <Select
            value={selectedStatus}
            onValueChange={(value) => {
              onChangeStatus(value);
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
              onChangeCountry(value);
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
              onChangeCategory(value);
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
