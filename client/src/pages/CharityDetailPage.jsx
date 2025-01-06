import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCharity } from "../utils/api/charity";
import CharityDetail from "../components/charity/CharityDetail";

const CharityDetailPage = () => {
  const params = useParams();
  const {
    data: charity,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`getCharity-${params.charity_id}`],
    queryFn: () => getCharity(params.charity_id),
  });

  return (
    <main className="flex flex-col items-center">
      Charity Detail Page {params.charity_id}
      {charity && <CharityDetail charity={charity} />}
    </main>
  );
};

export default CharityDetailPage;
