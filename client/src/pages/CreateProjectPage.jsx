import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/project/ProjectForm";
import "./CreateProjectPage.css"; // Import the new CSS file

const CreateProjectPage = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <main className="create-project-container">
      <button
        onClick={() => navigate("/")} // Navigate to the main page
        className="back-button"
      >
        &lt; Back to Main Page
      </button>
      <ProjectForm />
    </main>
  );
};

export default CreateProjectPage;
