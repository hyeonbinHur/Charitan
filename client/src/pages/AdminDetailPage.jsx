import { Separator } from "../components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getDeletedProject } from "../utils/api/delete_shard";
import { getProjectsByStatus } from "../utils/api/project";
import ProjectList from "../components/project/ProjectList";
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
      <p>Halted Project</p>
      {haltedProject && <ProjectList projects={haltedProject} />}
      <Separator />
      <p>Deleted Project</p>
      {deletedProject && <ProjectList projects={deletedProject} />}
    </main>
  );
};

export default AdminDetailPage;
