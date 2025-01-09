import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProject.css';
import { loadProjects, updateProject} from '../../utils/AdminAPI/ProjectAPI/projectData';

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(loadProjects);
  const project = projects.find((p) => p.id === parseInt(id));

  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [managerName, setManager] = useState(project?.managerName || '');
  const [managerEmail, setEmail] = useState(project?.managerEmail || '');
  const [endDate, setEndDate] = useState(project?.endDate || '');
  const [paymentMethod, setPaymentMethod] = useState(project?.paymentMethod || 'Bank Transfer');
  const [goal, setGoal] = useState(project?.goal || '');

  if (!project) return <p>Project not found</p>;

  const handleSave = () => {
    const updatedProject = {
      ...project,
      name,
      description,
      managerName,
      managerEmail,
      endDate,
      paymentMethod,
      goal,
    };
    navigate(`/admin/project/${id}`);
  };

  return (
    <div className='bg-custom-white min-h-screen min-w-[900px] p-6 mt-24'>
      <div className="edit-project">
        <h2 className='text-3xl font-fancy'>Edit Project</h2>
        <form>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Manager:</label>
          <input value={managerName} onChange={(e) => setManager(e.target.value)} />

          <label>Email:</label>
          <input value={managerEmail} onChange={(e) => setEmail(e.target.value)} />

          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash">Cash</option>
          </select>

          <label>Goal:</label>
          <textarea value={goal} onChange={(e) => setGoal(e.target.value)} />

          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={()=>navigate(`/admin/project/${id}`)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;

