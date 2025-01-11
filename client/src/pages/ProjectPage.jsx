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
import "./ProjectPage.css";

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
  const dispatch = useDispatch();
  const { data: lan } = useQuery({
    queryKey: [`language`],
    queryFn: () => readAcceptLanguageHeader(),
  });
  useEffect(() => {
    console.log(filterState);
    if (filterState.status === "" && lan) {
      if (lan.languageCode === "vi") {
        dispatch(updateCountry({ country: "Vietanm" }));
        setSelectedCountry("Vietnam");
      } else if (lan.languageCode === "de") {
        dispatch(updateCountry({ country: "Germany" }));
        setSelectedCountry("Germany");
      } else if (lan.languageCode === "ar") {
        dispatch(updateCountry({ country: "Qatar" }));
        setSelectedCountry("Qatar");
      } else if (lan.languageCode === "en") {
        dispatch(updateCountry({ country: "USA" }));
        setSelectedCountry("USA");
      } else if (lan.languageCode === "cm") {
        dispatch(updateCountry({ country: "Cameroon" }));
        setSelectedCountry("Camerron");
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

  return (
    <main>
      <div className="hero-section">
        <img
          src="https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.jpg?s=612x612&w=0&k=20&c=0fnD_g46lvoZ5NdzX5zYOSM4PzM95ezfs5uMe9D1QKs=" // Replace with your image URL
          alt="Charity banner"
          className="hero-image"
        />
        <div className="hero-description">
          <h1>Explore Our Projects</h1>
          <p>
            Our projects aim to make a positive impact on communities worldwide.
            Browse through a variety of initiatives focused on education,
            health, environment, and more. Your support can bring change and
            hope to those in need.
          </p>
        </div>
      </div>

      <SearchBar />
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
