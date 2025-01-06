import React from "react";

const ProjectDetail = ({ project }) => {
  return (
    <div>
      <div>
        <p> {project.category} using bread crumb</p>
        <div className="border rounded-lg bg-stone-500">
          <img className="w-[40rem]" src={project.thumbnail} />
        </div>
        <div className="border"> {project.title}</div>
        <div>
          {project.charity_id}, {project.created_at}, {project.updated_at}
        </div>
        <div className="w-full">
          <p>{project.description}</p>
        </div>
        <div>
          <div>{project.target_amount}</div>
          <div>{project.current_funding}</div>
        </div>
        <button>move to donation</button>
      </div>
    </div>
  );
};

export default ProjectDetail;
