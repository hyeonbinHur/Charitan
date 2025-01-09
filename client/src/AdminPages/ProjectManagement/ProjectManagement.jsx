import React from "react";
import { useState } from "react";
import ProjectList from "../../AdminComponent/Project/ProjectList";
import { loadProjects, loadHighlightedProjects, toggleHighlight } from "../../utils/AdminAPI/ProjectAPI/projectData";

export default function ProjectManagement() {
    const [projects, setProjects] = useState(loadProjects);
    const [highlightedProjects, setHighlightedProjects] = useState(
        loadHighlightedProjects
    );
    const handleToggleHighlight = (id, type) => {
        setHighlightedProjects(toggleHighlight(highlightedProjects, id, type));
    };
    return(
        <div className="min-w-[900px] mt-24 bg-custom-white min-h-screen p-6 pl-16 pr-16">
            <ProjectList
                projects={projects}
                highlightedProjects={highlightedProjects}
                toggleHighlight={handleToggleHighlight}
            />
        </div>
    );
}