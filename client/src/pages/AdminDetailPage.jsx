import { Separator } from "../components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getDeletedProject } from "../utils/api/delete_shard";
import { getProjectsByStatus } from "../utils/api/project";
import ProjectList from "../components/project/ProjectList";
import DeletedProjectList from "../components/project/DeletedProjectList";
const AdminDetailPage = () => {
  const { data: haltedProject } = useQuery({
    queryKey: ["getHaltedProject"],
    queryFn: () => getProjectsByStatus("Halted"),
  });
  const { data: deletedProject } = useQuery({
    queryKey: ["getDeletedProject"],
    queryFn: () => getDeletedProject(),
  });
  return (
    <main>
      <p className="font-semibold text-4xl mb-5 text-gray-300">
        Halted Project
      </p>
      {haltedProject && <ProjectList projects={haltedProject} />}
      <Separator className="my-5" />
      <p className="font-semibold text-4xl my-5 text-gray-300">
        Deleted Project
      </p>
      {deletedProject && <DeletedProjectList projects={deletedProject} />}
    </main>
  );
};

export default AdminDetailPage;
