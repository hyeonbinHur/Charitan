import { useNavigate } from "react-router-dom";
import "./MainPage.css"; // Optional: Keep for consistent styling
import { useQuery } from "@tanstack/react-query";

import { readAcceptLanguageHeader } from "../utils/api/languageUtils";
const MainPage = () => {
  const navigate = useNavigate(); // Initialize navigation function
  const { data: lan } = useQuery({
    queryKey: [`language`],
    queryFn: () => readAcceptLanguageHeader(),
  });

  return (
    <main
      style={{ padding: "20px", display: "flex", justifyContent: "center" }}
    >
      <div
        className="create-project-box"
        onClick={() => navigate("/create-project")} // Navigate to CreateProjectPage
      >
        <div>{lan && <div>{lan.languageCode}</div>}</div>
      </div>
    </main>
  );
};

export default MainPage;
