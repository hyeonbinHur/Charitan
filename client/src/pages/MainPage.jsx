import { useNavigate } from "react-router-dom";
import "./MainPage.css"; // Optional: Keep for consistent styling
import { useTranslation } from "react-i18next";
const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <main
      style={{ padding: "20px", display: "flex", justifyContent: "center" }}
    >
      <div
        className="create-project-box"
        onClick={() => navigate("/create-project")} // Navigate to CreateProjectPage
      >
        <h2 style={{ textAlign: "center" }}>Create Project</h2>
        heelo
        <div>
          <h1>{t("greeting")}</h1>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
