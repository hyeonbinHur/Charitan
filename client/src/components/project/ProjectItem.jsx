import React from "react";

const ProjectItem = ({ project }) => {
  return (
    <div className="hover:shadow-2xl cursor-pointer border h-60 border-stone-500 rounded-lg flex gap-5 p-5">
      <div className="w-[15rem] h-full">
        <div className="w-full h-full bg-slate-600 rounded-md">
          <img src={project.thumbnail} />
        </div>
      </div>
      <div className="flex flex-col justify-between text-sm">
        <p>Organization Name</p>
        <p className="font-bold text-lg ">{project.title}</p>
        <p>{project.category}</p>
        <p>{project.description}</p>
        <p>{project.created_at} (it need to be modified)</p>
      </div>
    </div>
  );
};

export default ProjectItem;
