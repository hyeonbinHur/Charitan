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
const ProjectDetail = ({ project }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);

  /**
   * Http Requests
   */

  const { data: messages } = useQuery({
    queryKey: [`read-project-message-${project.project_id}`],
    queryFn: () => readMessages(project.project_id),
  });
  const { mutate: mutateDeleteProject } = useMutation({
    mutationFn: ({ projectId }) => {
      return deleteProject(projectId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("read-projects");
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

            <ScrollArea>
              {messages &&
                messages.map((e, i) => (
                  <div key={`message-key-${i}`}>{e.content} </div>
                ))}
            </ScrollArea>
          </div>
        </div>
      ) : (
        <ProjectForm project={project} />
      )}
    </div>
  );
};

export default ProjectDetail;
