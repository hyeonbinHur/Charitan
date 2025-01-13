import { useState, useContext } from "react";
import { Button } from "../ui/button";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../utils/api/project";
import { createDeletedProject } from "../../utils/api/delete_shard";
import { useNavigate, useParams } from "react-router-dom";
import MessageAccordion from "../message/MessageAccordion";
import ProjectContent from "./ProjectContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Separator } from "../ui/separator";
import { UserContext } from "../../context/AuthContext";
import ProjectVideoContent from "./ProjectVideoContent";

const ProjectDetail = ({ project }) => {
  const { user } = useContext(UserContext);
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
    <div className="p-6 rounded-lg shadow-lg text-gray-200">
      {/* Edit and Delete Buttons */}
      <div className="flex gap-4 mb-6">
        {user &&
          user.user_type === "Charity" &&
          user.charity_id === project.charity_id && (
            <Button
              onClick={onClickEditButton}
              className="bg-blue-600 text-white hover:bg-blue-900 px-4 py-2 rounded-md"
            >
              {!isEditting ? "Edit" : "Cancel"}
            </Button>
          )}

        {project.status === "Halted" && user.user_type === "Admin" && (
          <Button
            onClick={onClickDeleteProject}
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md"
          >
            Delete Project
          </Button>
        )}
      </div>

      <Breadcrumb className="text-2xl mb-5">
        <BreadcrumbList>
          <BreadcrumbItem className="text-xl">Charitan</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-xl">
            {project.category}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem
            className="text-xl text-gray-300 cursor-pointer hover:border-gray-300 border-b border-transparent transition-all"
            onClick={() => {
              navigate(`/charity/${project.charity_id}`);
            }}
          >
            {project.charity_name}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {!isEditting ? (
        <div className="space-y-6">
          {/* Breadcrumb */}
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-100 text-center">
            {project.title}
          </h2>
          {/* Thumbnail */}
          <div className="border border-gray-700 rounded-lg overflow-hidden shadow-md">
            <img
              className="w-full h-96 object-cover"
              src={project.thumbnail}
              alt={project.title}
            />
          </div>
          <Separator className="my-2" />
          <div className="text-gray-400 flex justify-between">
            <p>
              Written By :{" "}
              <strong className="border-b py-2"> {project.charity_name}</strong>
            </p>
            <p>
              <span className="text-sm">
                {new Date(project.created_at).toLocaleDateString()}
              </span>
            </p>
          </div>
          <Separator className="my-2" />
          {/* Description */}
          <div className="text-base mt-4 text-gray-300">
            <ProjectContent htmlContent={project.description} />
          </div>
          {/* Target and Current Funding */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-gray-100">
                Target Amount:
              </div>
              <div className="text-lg text-gray-300">
                {project.target_amount}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-gray-100">
                Current Funding:
              </div>
              <div className="text-lg text-gray-300">
                {project.current_funding}
              </div>
            </div>
          </div>
          {/* Details */}
          <div className="text-sm text-gray-400">
            <p>
              <span>{new Date(project.created_at).toLocaleDateString()}</span>
            </p>
          </div>
          <div>
            <ProjectVideoContent
              video_1={project.video_1}
              video_2={project.video_2}
              video_3={project.video_3}
              video_4={project.video_4}
            />
          </div>
          {/* Donate Button */}
          <div className="mt-4">
            <Button
              onClick={handleDonationClick}
              className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-md"
            >
              Donate Now
            </Button>
          </div>

          {/* Message Accordion */}
          <div className="mt-8">
            <MessageAccordion project_id={project.project_id} />
          </div>
        </div>
      ) : (
        <ProjectForm project={project} />
      )}
    </div>
  );
};

export default ProjectDetail;
