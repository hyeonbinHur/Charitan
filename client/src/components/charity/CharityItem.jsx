import React from "react";

const CharityItem = ({ charity }) => {
  return (
    <div className="hover:shadow-2xl cursor-pointer border h-60 border-stone-500 rounded-lg flex gap-5 p-5">
      <div className="w-[15rem] h-full">
        <div className="w-full h-full bg-slate-600 rounded-md"> Avatar</div>
      </div>
      <div className="flex flex-col justify-between text-sm">
        <p>Organization Name</p>
        <p className="font-bold text-lg ">{charity.organization_name}</p>
        <p>{charity.category}</p>
        <p>{charity.description}</p>
        <p>{charity.created_at} (it need to be modified)</p>
      </div>
    </div>
  );
};

export default CharityItem;
