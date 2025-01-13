import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProjectDetail.css';
import {updateProjectByAdminRole, fetchAllProjects } from '../../utils/AdminAPI/ProjectAPI/projectData';

const AdminProjectDetailPage = () => {
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState();
  const [haltReason, setHaltReason] = useState('');
  const [showHaltReason, setShowHaltReason] = useState(false);

  useEffect(() => {
    // Update project when projects or id changes
    if (projects.length > 0 && id) {
      const selectedProject = projects.find((p) => p.projectId === parseInt(id, 10));
      setProject(selectedProject);
    }
  }, [projects, id]);
  
  const updateStatus = (status) => {
    setProject((preProject) => ({
      ...preProject, // Keep the other properties
      projectStatus: status, // Update the highlight property
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateProjectByAdminRole(id, project);
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  if (!project) {
    return <p className='mt-48'>Cannot find project.</p>;
  }

  const handleApprove = () => {
    navigate('/admin_role/page3');
  };

  const handleReject = () => {
    navigate('/admin_role/page3');
  };

  const handleHalt = () => {
    setShowHaltReason(true);
  };

  return (
    <div className='bg-custom-white min-h-screen p-4 mt-24'>
        <div className="project-detail">
        <h2 className="font-fancy">Project Detail: {project.title}</h2>
        <table>
            <tbody>
            <tr>
                <th>Description:</th>
                <td>{project.description}</td>
            </tr>
            <tr>
                <th>Manager:</th>
                <td>{project.charityName}</td>
            </tr>
            <tr>
                <th>Date:</th>
                <td>{project.createdAt}</td>
            </tr>
            <tr>
                <th>Bank Account:</th>
                <td>{project.bankAccount}</td>
            </tr>
            <tr>
                <th>Goal:</th>
                <td>{project.targetAmuont}</td>
            </tr>
            <tr>
                <th>Current:</th>
                <td>{project.currentFunding}</td>
            </tr>
            <tr>
                <th>Status:</th>
                <td>{project.projectStatus}</td>
            </tr>
            </tbody>
        </table>

        <div className="button-group">
            {/* Show Approve/Reject buttons only when status is "pending" */}
            {project.status === 'pending' && (
            <>
                <button className="green" onClick={handleApprove}>
                Approve
                </button>
                <button className="red" onClick={handleReject}>
                Reject
                </button>
            </>
            )}
            <button className="yellow" onClick={handleHalt}>
            Halt
            </button>
            <Link to={`/admin_role/edit-project/${project.projectId}`}>
            <button>Edit</button>
            </Link>
            <button type="button" onClick={()=>navigate(`/admin_role/page3`)}>Back</button>
        </div>

        {/* Halt reason modal */}
        {showHaltReason && (
            <div className="modal">
            <div className="modal-content">
                <h3>Halt Project</h3>
                <textarea
                value={haltReason}
                onChange={(e) => setHaltReason(e.target.value)}
                placeholder="Enter reason for halting this project"
                />
                <div className="modal-buttons">
                <button>Confirm Halt</button>
                <button onClick={() => setShowHaltReason(false)}>Cancel</button>
                </div>
            </div>
            </div>
        )}
        </div>
    </div>
  );
};

export default AdminProjectDetailPage;