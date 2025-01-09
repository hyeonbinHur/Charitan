import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/project/ProjectForm";
import "./CreateProjectPage.css"; // Import the new CSS file
import { useParams } from "react-router-dom";

const CreateProjectPage = () => {
  const params = useParams();

  const navigate = useNavigate(); // Initialize navigation

  return (
    <main className="create-project-container">
      <button
        onClick={() => navigate(`/charity/project/${params.charity_id}`)} // Navigate to the main page
        className="back-button"
      >
        &lt; Back
      </button>
      <ProjectForm />
    </main>
  );
};

export default CreateProjectPage;
