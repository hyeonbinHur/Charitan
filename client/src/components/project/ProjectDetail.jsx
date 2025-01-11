import { useState } from "react";
import { Button } from "../ui/button";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../utils/api/project";
import { createDeletedProject } from "../../utils/api/delete_shard";
import { useNavigate, useParams } from "react-router-dom";
import MessageAccordion from "../message/MessageAccordion";
import ProjectContent from "./ProjectContent";

const ProjectDetail = ({ project }) => {
  const [isEditting, setIsEditting] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { project_id } = useParams();

  const { mutate: mutateCreateShard } = useMutation({
    mutationFn: ({ newProject }) => createDeletedProject(newProject),
    onSuccess: () => queryClient.invalidateQueries("read-projects"),
  });

  const { mutate: mutateDeleteProject } = useMutation({
    mutationFn: ({ projectId }) => deleteProject(projectId),
    onSuccess: () => mutateCreateShard({ newProject: project }),
  });

  const onClickDeleteProject = () => {
    mutateDeleteProject({ projectId: project.project_id });
  };

  const onClickEditButton = () => {
    setIsEditting((prev) => !prev);
  };

  const handleDonationClick = () => {
    navigate(`/donation/${project_id}`);
  };

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <Button onClick={onClickEditButton}>Edit</Button>
      {project.status === "Halted" && (
        <Button onClick={onClickDeleteProject}>Delete Project</Button>
      )}
      {!isEditting ? (
        <div className="space-y-6 text-gray-800">
          <div className="text-sm mb-2">
            <p>
              {project.category}{" "}
              <span className="text-gray-400">using breadcrumb</span>
            </p>
          </div>

          <h2 className="text-3xl font-bold">{project.title}</h2>

          <div className="border rounded-lg overflow-hidden shadow-md">
            <img
              className="w-full h-96 object-cover"
              src={project.thumbnail}
              alt={project.title}
            />
          </div>

          <div className="text-sm">
            <p>
              {project.charity_id},{" "}
              <span>{project.created_at}</span>,{" "}
              <span>{project.updated_at}</span>
            </p>
          </div>

          <div className="text-base mt-4">
            <ProjectContent htmlContent={project.description} />
          </div>

          <div className="flex justify-between mt-6">
            <div className="text-lg font-semibold">Target Amount:</div>
            <div className="text-lg">{project.target_amount}</div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-lg font-semibold">Current Funding:</div>
            <div className="text-lg">{project.current_funding}</div>
          </div>
          <Button onClick={handleDonationClick}>Donate Now</Button>
          <MessageAccordion project_id={project.project_id} />
        </div>
      ) : (
        <ProjectForm project={project} />
      )}
    </div>
  );
};

export default ProjectDetail;
