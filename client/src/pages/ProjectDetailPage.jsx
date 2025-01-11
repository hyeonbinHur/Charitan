import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "../utils/api/project";
import ProjectDetail from "../components/project/ProjectDetail";
import ProjectDetailSkeleton from "../components/project/skeletons/ProjectDetailSkeleton";

const ProjectDetailPage = () => {
  const { project_id } = useParams();

  const { data: project, isLoading, isError } = useQuery({
    queryKey: [`getProject-${project_id}`],
    queryFn: () => getProject(project_id),
  });

  if (isError) {
    return (
      <main className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="text-gray-600">Failed to load project details. Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-6">
      {isLoading ? (
        <ProjectDetailSkeleton />
      ) : (
        <ProjectDetail project={project} />
      )}
    </main>
  );
};

export default ProjectDetailPage;
