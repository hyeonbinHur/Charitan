// @ts-nocheck
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { deleteProject } from "../../utils/api/project";
import { Textarea } from "../ui/textarea";
import { sendMessage, readMessages } from "../../utils/api/message";
import { ScrollArea } from "../ui/scroll-area";
import { UserContext } from "../../context/AuthContext";
import { isInputOver } from "../../helper/inputHelper";
import { createDeletedProject } from "../../utils/api/delete_shard";
<<<<<<< HEAD
import { useNavigate, useParams } from "react-router-dom";
=======
import MessageAccordion from "../message/MessageAccordion";
>>>>>>> main

const ProjectDetail = ({ project }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { project_id } = useParams();

  /**
   * Http Requests
   */

  const { data: messages } = useQuery({
    queryKey: [`read-project-message-${project.project_id}`],
    queryFn: () => readMessages(project.project_id),
  });

  const { mutate: mutateCreateShard } = useMutation({
    mutationFn: ({ newProject }) => {
      return createDeletedProject(newProject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("read-projects");
    },
  });

  const { mutate: mutateDeleteProject } = useMutation({
    mutationFn: ({ projectId }) => {
      return deleteProject(projectId);
    },
    onSuccess: () => {
      mutateCreateShard({ newProject: project });
    },
  });

  const { mutate: mutateSendMessage } = useMutation({
    mutationFn: ({ newMessage }) => {
      return sendMessage(newMessage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        `read-project-message-${project.project_id}`
      );
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
    if (!isInputOver(e.target.value, 250)) {
      setTestMessage(e.target.value);
    }
  };
  const onClickSendMessage = () => {
    const newMessage = {
      project_id: project.project_id,
      donataion_id: user ? user.donor_id : null,
      donor_email: user ? user.email : null,
      content: testMessage,
    };
    mutateSendMessage({ newMessage: newMessage });
  };
  const handleDonationClick = () => {
    console.log(project_id);
    navigate(`/donation/${project_id}`);
  };
  return (
    <div className="">
      <Button onClick={() => onClickEditButton()}>Edit</Button>
      {project.status === "Halted" && (
        <Button onClick={() => onClickDeleteProject()}>Delete Project</Button>
      )}
      {!isEditting ? (
        <div>
          <p> {project.category} using bread crumb</p>
          <div className="border rounded-lg bg-stone-500 ">
            <img
              className="w-[40rem] border-2 border-red-500"
              src={project.thumbnail}
            />
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
          <Button onClick={handleDonationClick}>Donate Now</Button>
          <div className="m-3 flex flex-col gap-3 border-black-500 border-2 p-2">
            <Textarea
              type="text"
              value={testMessage}
              onChange={onChangeTestMessage}
            />
            <Button onClick={() => onClickSendMessage()}>
              Submit test message
            </Button>
            <ScrollArea>
              {messages &&
                messages.map((e, i) => (
                  <div key={`message-key-${i}`}>{e.content} </div>
                ))}
            </ScrollArea>
          </div>
          <MessageAccordion project_id={project.project_id} />
        </div>
      ) : (
        <ProjectForm project={project} />
      )}
    </div>
  );
};

export default ProjectDetail;
