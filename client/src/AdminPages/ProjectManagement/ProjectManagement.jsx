import React from "react";
import { useState,useEffect } from "react";
import ProjectList from "../../AdminComponent/Project/ProjectList";
import {fetchAllProjects } from "../../utils/AdminAPI/ProjectAPI/projectData";

export default function ProjectManagement() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const fetch = async () => {
        try {
            const data = await fetchAllProjects();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects list:", error);
        }
        };

        fetch();
    }, [])
    return(
        <div className="min-w-[900px] mt-24 bg-custom-white min-h-screen p-6 pl-16 pr-16">
            <ProjectList
                projects={projects}
                
            />
        </div>
    );
}