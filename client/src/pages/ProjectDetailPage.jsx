import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "../utils/api/project";
import ProjectDetail from "../components/project/ProjectDetail";
import SkeletonProjectDetail from "../skeleton/SkeletonProjectDetail";

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
    <main className="flex flex-col items-center">
      <SkeletonProjectDetail />
      Project Detail Page
      {project && <ProjectDetail project={project} />}
    </main>
  );
};

export default ProjectDetailPage;
