import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';

const ProjectList = ({ projects, highlightedProjects, toggleHighlight }) => {
  const [selectedStatus, setSelectedStatus] = useState('pending');

  const filteredProjects = projects.filter(
    (project) => project.status === selectedStatus
  );

  const renderHighlightButton = (project) => {
    const type = project.region === 'Global' ? 'global' : 'regional';
    const isHighlighted = highlightedProjects[type].includes(project.id);

    return (
      <button
        className={isHighlighted ? 'highlighted' : ''}
        onClick={() => toggleHighlight(project.id, type)}
      >
        {isHighlighted ? 'Unhighlight' : 'Highlight'}
      </button>
    );
  };

  return (
    <div className="project-list">
      <h2 className="text-xl font-bold mb-4">Project List</h2>

      <div className="filter-buttons mb-4">
        <button
          className={`filter-button ${selectedStatus === 'pending' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-button ${selectedStatus === 'approved' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('approved')}
        >
          Approved
        </button>
        <button
          className={`filter-button ${selectedStatus === 'rejected' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('rejected')}
        >
          Rejected
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
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{project.name}</td>
                <td className="border border-gray-300 px-4 py-2">{project.region}</td>
                <td className="border border-gray-300 px-4 py-2">{project.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={`/project/${project.id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Info
                    </button>
                  </Link>
                  {renderHighlightButton(project)}
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