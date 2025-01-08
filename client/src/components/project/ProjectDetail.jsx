// @ts-nocheck
import { useState } from "react";
import { Button } from "../ui/button";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../utils/api/project";
import { Textarea } from "../ui/textarea";
import { sendMessage, readMessages } from "../../utils/api/message";

const ProjectDetail = ({ project }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [testMessage, setTestMessage] = useState("");
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

  const { mutate: mutateSendMessage } = useMutation({
    mutationFn: ({ newMessage }) => {
      return sendMessage(newMessage);
    },
    onSuccess: () => {
      console.log("send mesage successfully");
      queryClient.invalidateQueries("read-projects");
    },
  });

  /**
   * Basic function & event handler
   */
  const onClickDeleteProject = () => {
    mutateDeleteProject({ projectId: project.project_id });
  };
  const onClickEditButton = () => {
    setIsEditting((prev) => !prev);
  };
  const onChangeTestMessage = (e) => {
    setTestMessage(e.target.value);
  };
  const onClickSendMessage = () => {
    const newMessage = {};
    mutateSendMessage({ newMessage: newMessage });
  };

  return (
    <div className="w-1/2">
      <Button onClick={() => onClickEditButton()}>Edit</Button>
      {project.status === "Halted" && (
        <Button onClick={() => onClickDeleteProject()}>Delete Project</Button>
      )}
      {!isEditting ? (
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
          <Button>move to donation</Button>
          <div className="m-3 flex flex-col gap-3 border-black-500 border-2 p-2">
            <Textarea
              type="text"
              value={testMessage}
              onChange={onChangeTestMessage}
            />
            <Button onClick={() => onClickSendMessage()}>
              Submit test message
            </Button>
          </div>
        </div>
      ) : (
        <ProjectForm project={project} />
      )}
    </div>
  );
};

export default ProjectDetail;
