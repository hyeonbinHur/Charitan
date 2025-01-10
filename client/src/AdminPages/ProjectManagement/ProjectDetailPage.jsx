import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProjectDetail.css';
import { loadProjects, updateProjectStatus } from '../../utils/AdminAPI/ProjectAPI/projectData';

const AdminProjectDetailPage = () => {
  const [projects, setProjects] = useState(loadProjects);
  const handleUpdateProjectStatus = (id, status, reason = '') => {
    setProjects(updateProjectStatus(projects, id, status, reason));
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));
  const [haltReason, setHaltReason] = useState('');
  const [showHaltReason, setShowHaltReason] = useState(false);

  if (!project) {
    return <p>Cannot find project.</p>;
  }

  const handleApprove = () => {
    handleUpdateProjectStatus(project.id, 'approved');
    navigate('/page3');
  };

  const handleReject = () => {
    handleUpdateProjectStatus(project.id, 'rejected');
    navigate('/page3');
  };

  const handleHalt = () => {
    setShowHaltReason(true);
  };

  const confirmHalt = () => {
    if (haltReason.trim()) {
      handleUpdateProjectStatus(project.id, 'halted', haltReason);
      setShowHaltReason(false);
      navigate('/page3');
    } else {
      alert('Please provide a reason for halting the project.');
    }
  };

  return (
    <div className='bg-custom-white min-h-screen p-4 mt-24'>
        <div className="project-detail">
        <h2 className="font-fancy">Project Detail: {project.name}</h2>
        <table>
            <tbody>
            <tr>
                <th>Description:</th>
                <td>{project.description}</td>
            </tr>
            <tr>
                <th>Manager:</th>
                <td>{project.managerName}</td>
            </tr>
            <tr>
                <th>Email:</th>
                <td>{project.managerEmail}</td>
            </tr>
            <tr>
                <th>Date:</th>
                <td>{project.createdAt}</td>
            </tr>
            <tr>
                <th>End Date:</th>
                <td>{project.endDate}</td>
            </tr>
            <tr>
                <th>Payment Method:</th>
                <td>{project.paymentMethod}</td>
            </tr>
            <tr>
                <th>Goal:</th>
                <td>{project.goal}</td>
            </tr>
            <tr>
                <th>Current:</th>
                <td>{project.current}</td>
            </tr>
            <tr>
                <th>Status:</th>
                <td>{project.status}</td>
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
            <Link to={`/admin/edit-project/${project.id}`}>
            <button>Edit</button>
            </Link>
            <button type="button" onClick={()=>navigate(`/admin/page3`)}>Back</button>
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
                <button onClick={confirmHalt}>Confirm Halt</button>
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