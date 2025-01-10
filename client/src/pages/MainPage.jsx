import { useNavigate } from "react-router-dom";
import "./MainPage.css"; // Optional: Keep for consistent styling

const MainPage = () => {
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
      </div>
    </main>
  );
};

export default MainPage;
