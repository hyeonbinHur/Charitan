// import { useState, useEffect } from "react";
import { getCharities } from "@/utils/api/charity";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CharityItem from "./CharityItem";

//Read Charities
const CharityList = () => {
  const { data: charities } = useQuery({
    queryKey: ["get-all-charities"],
    queryFn: () => getCharities(),
  });
  const navigate = useNavigate();
  const handleNavigateToDetail = (charityId) => {
    navigate(`/charity/${charityId}`);
  };
  return (
    <div>
      {charities &&
        charities.map((charity) => (
          <div
            key={charity.charity_id}
            className="my-5"
            onClick={() => handleNavigateToDetail(charity.charity_id)}
          >
            {/* <SkeletonCharityItem charity={charity} /> */}
            <CharityItem charity={charity} />
          </div>
        ))}
    </div>
  );
};

export default CharityList;
