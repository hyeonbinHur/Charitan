import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "../utils/api/project";
import ProjectDetail from "../components/project/ProjectDetail";
import ProjectDetailSkeleton from "../components/project/skeletons/ProjectDetailSkeleton";
const ProjectDetailPage = () => {
  const params = useParams();
  const { data: project, isLoading } = useQuery({
    queryKey: [`getProject-${params.project_id}`],
    queryFn: () => getProject(params.project_id),
  });
  return (
    <main className="flex flex-col items-center">
      Project Detail Page {isLoading ? "loading" : "not loading"}
      {isLoading ? (
        <ProjectDetailSkeleton />
      ) : (
        <ProjectDetail project={project} isLoading={isLoading} />
      )}
    </main>
  );
};

export default ProjectDetailPage;
