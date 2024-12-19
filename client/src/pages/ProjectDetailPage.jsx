import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/utils/api/charityProject";

const ProjectDetailPage = () => {
  const params = useParams();
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`getProject-${params.project_id}`],
    queryFn: () => getProject(params.project_id),
  });
  return (
    <section className="flex flex-col items-center">
      Project Detail Page
      {project && (
        <div>
          <p> {project.category} using bread crumb</p>
          <div className="border w-[45rem] h-[20rem] rounded-lg bg-stone-500">
            Thumbnail
          </div>
          <div> {project.title}</div>
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
      )}
    </section>
  );
};

export default ProjectDetailPage;
