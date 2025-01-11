import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCharity } from "../utils/api/charity";
import CharityDetail from "../components/charity/CharityDetail";
// import SkeletonCharityDetail from "../skeleton/SkeletonCharityDetail";
const CharityDetailPage = () => {
  const params = useParams();
  const { data: charity } = useQuery({
    queryKey: [`getCharity-${params.charity_id}`],
    queryFn: () => getCharity(params.charity_id),
  });
  return (
    <div>
      {/* <SkeletonCharityDetail /> */}
      <main className="flex flex-col items-center">
        Charity Detail Page {params.charity_id}
        {charity && <CharityDetail charity={charity} />}
      </main>
    </div>
  );
};

export default CharityDetailPage;
