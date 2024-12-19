import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCharity } from "@/utils/api/charity";

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
    <section className="flex flex-col items-center">
      Project Detail Page {params.charity_id}
      {charity && (
        <div>
          <p> {charity.category} using bread crumb</p>
          <div className="border w-[45rem] h-[20rem] rounded-lg bg-stone-500">
            Avatar
          </div>
          <div> {charity.organization_name}</div>
          <div>
            {charity.charity_id}, {charity.createdAt}, {charity.updatedAt}
          </div>

          <div>
            <p>{charity.description}</p>
          </div>

          <div>
            <p>{charity.email}</p>
          </div>

          <button>create charity</button>
        </div>
      )}
    </section>
  );
};

export default CharityDetailPage;
