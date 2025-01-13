import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';
import { fetchAllProjects, updateProjectByAdminRole } from '../../utils/AdminAPI/ProjectAPI/projectData';

const ProjectList = ({ projects }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [updatedProject, setUpdatedProject] = useState({});
  const [projectId, setProjectId] = useState();

  const updateHighlight = () => {
    setUpdatedProject(allProjects.filter((pro) =>
      pro.projectId === projectId
    ));
    setUpdatedProject((preProject) => ({
      ...preProject, // Keep the other properties
      highlight: "TRUE", // Update the highlight property
    }));
  };
  
  useEffect(() => {
    const fetch = async () => {
      try {
          const data = await fetchAllProjects();
          setAllProjects(data);
      } catch (error) {
          console.error("Error fetching projects list:", error);
      }
    };
    fetch();
  }, [])
  
  const handleUpdate = async (id) => {
    updateHighlight();
    try {
      await updateProjectByAdminRole(id, updatedProject);
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };
  
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const filteredProjects = projects.filter(
    (project) => project.projectStatus === selectedStatus
  );

  return (
    <div className="flex flex-col mt-36">
      <h2 className="font-bold mb-4 text-black text-4xl">Project List</h2>

      <div className="filter-buttons mb-4">
        <button
          className={`filter-button ${selectedStatus === 'Pending' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('Pending')}
        >
          Pending
        </button>
        <button
          className={`filter-button ${selectedStatus === 'Active' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('Active')}
        >
          Active
        </button>
        <button
          className={`filter-button ${selectedStatus === 'Halted' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('Halted')}
        >
          Halted
        </button>
        <button
          className={`filter-button ${selectedStatus === 'Completed' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('Completed')}
        >
          Completed
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <p>No Projects exist</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Project Name</th>
              <th className="border border-gray-300 px-4 py-2">Categories</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.projectId} className="hover:bg-gray-50">
                <td className={`border border-gray-300 px-4 py-2  ${project.highlight === "TRUE" ? "underline" : ""}`}>{project.title}</td>
                <td className="border border-gray-300 px-4 py-2">{project.category}</td>
                <td className="border border-gray-300 px-4 py-2">{project.projectStatus}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={`/admin_role/project/${project.projectId}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500">
                      Info
                    </button>
                  </Link>
                    <button onClick={() => {setProjectId(project.projectId); updateHighlight();  handleUpdate(project.projectId)}}  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 ml-6">
                      Hightlight
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectList;