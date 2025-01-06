// @ts-nocheck
import { useState } from "react";
import { Button } from "../ui/button";
import ProjectForm from "./ProjectForm";

const ProjectDetail = ({ project }) => {
  const [isEditting, setIsEditting] = useState(false);
  const onClickEditButton = () => {
    setIsEditting((prev) => !prev);
  };
  return (
    <div className="w-1/2">
      <Button onClick={() => onClickEditButton()}>Edit</Button>
      {isEditting ? (
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
      ) : (
        <ProjectForm project={project} />
      )}
    </div>
  );
};

export default ProjectDetail;
