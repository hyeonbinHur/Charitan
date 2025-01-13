import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProject.css';
import { fetchAllProjects, updateProjectByAdminRole} from '../../utils/AdminAPI/ProjectAPI/projectData';

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const project = projects.find((p) => p.projectId === parseInt(id));

  const [title, setName] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [charityName, setManager] = useState(project?.charityName || '');
  const [managerEmail, setEmail] = useState(project?.managerEmail || '');
  const [endDate, setEndDate] = useState(project?.endDate || '');
  const [bankAccount, setPaymentMethod] = useState(project?.bankAccount || 'Bank Transfer');
  const [targetAmount, setGoal] = useState(project?.targetAmount || '');

  if (!project) return <p>Project not found</p>;

  const handleSave = async () => {
    const updatedProject = {
      ...project,
      title,
      description,
      charityName,
      bankAccount,
      targetAmount,
    };
    try {
      await updateProjectByAdminRole(id, updatedProject);
      alert("Project updated successfully!");
      navigate(`/admin_role/project/${id}`);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  return (
    <div className='bg-custom-white min-h-screen min-w-[900px] p-6 mt-24'>
      <div className="edit-project">
        <h2 className='text-3xl font-fancy'>Edit Project</h2>
        <form>
          <label>Name:</label>
          <input value={title} placeholder={project.title} onChange={(e) => setName(e.target.value)} />

          <label>Description:</label>
          <textarea value={description} placeholder={project.description} onChange={(e) => setDescription(e.target.value)} />

          <label>Manager:</label>
          <input value={charityName} placeholder={project.charityName} onChange={(e) => setManager(e.target.value)} />

          <label>Email:</label>
          <input value={managerEmail} placeholder={project.charity.email} onChange={(e) => setEmail(e.target.value)} />

          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <label>Bank Account:</label>
          <input value={bankAccount} placeholder={project.bankAccount} onChange={(e) => setPaymentMethod(e.target.value)}/>

          <label>Goal:</label>
          <input value={targetAmount} placeholder={`${project.targetAmount} $`} onChange={(e) => setGoal(e.target.value)} />

          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={()=>navigate(`/admin_role/project/${id}`)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;

