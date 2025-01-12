import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCharity } from "../utils/api/charity";
import CharityDetail from "../components/charity/CharityDetail";
import { Button } from "../components/ui/button";
// import SkeletonCharityDetail from "../skeleton/SkeletonCharityDetail";
import { Link } from "react-router-dom";

const CharityPersonalPage = () => {
  const params = useParams();
  const { data: charity } = useQuery({
    queryKey: [`getCharity-${params.charity_id}`],
    queryFn: () => getCharity(params.charity_id),
  });
  return (
    <div>
      {/* <SkeletonCharityDetail /> */}
      <Button>
        <Link to={`/charity/project/${params.charity_id}`}>To Projects</Link>
      </Button>
      <Button>
        <Link to={`/charity/inbox/${params.charity_id}`}>To email inbox</Link>
      </Button>
      <main className="flex flex-col items-center">
        Charity Detail Page {params.charity_id}
        {charity && <CharityDetail charity={charity} />}
      </main>
    </div>
  );
};

export default CharityPersonalPage;
