import { useParams } from "react-router-dom";
import CharityProjectList from "../components/charity/CharityProjectList";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
const CharityProjectsPage = () => {
  const params = useParams();
  return (
    <div>
      <Button>
        <Link to={`/create-project/${params.charity_id}`}>Create Project</Link>
      </Button>
      <CharityProjectList chairty_id={params.charity_id} />
    </div>
  );
};

export default CharityProjectsPage;
