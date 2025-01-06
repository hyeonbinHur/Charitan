// @ts-nocheck
import { useState } from "react";
import { Button } from "../ui/button";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../utils/api/project";
const ProjectDetail = ({ project }) => {
  const [isEditting, setIsEditting] = useState(false);
  const onClickEditButton = () => {
    setIsEditting((prev) => !prev);
  };
  const queryClient = useQueryClient();
  /**
   * Http Requests
   */
  const { mutate: mutateDeleteProject } = useMutation({
    mutationFn: ({ projectId }) => {
      return deleteProject(projectId);
    },
    onSuccess: () => {
      console.log("delete success");
      queryClient.invalidateQueries("read-projects");
    },
  });
  const onClickDeleteProject = () => {
    mutateDeleteProject({ projectId: project.project_id });
  };
  return (
    <div className="w-1/2">
      <Button onClick={() => onClickEditButton()}>Edit</Button>
      {project.status === "Halted" && (
        <Button onClick={() => onClickDeleteProject()}>Delete Project</Button>
      )}
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
