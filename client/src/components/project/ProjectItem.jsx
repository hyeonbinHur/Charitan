const ProjectItem = ({ project }) => {
  return (
    <div className="hover:shadow-2xl cursor-pointer border h-60 border-stone-500 rounded-lg flex gap-5 p-5">
      <div className="w-1/4">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={project.thumbnail}
            alt={`Protject thumbnail image : ${project.title}`}
            className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 blur-sm brightness-50"
            loading="lazy"
          />
          <img
            src={project.thumbnail}
            alt={`Protject thumbnail image : ${project.title}`}
            className="absolute top-1/2 left-1/2 w-[85%] transform -translate-x-1/2 -translate-y-1/2 "
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between text-sm w-3/4">
        <p>Organization Name</p>
        <p className="font-bold text-lg ">{project.title}</p>
        <p>{project.category}</p>
        <p className="">{project.description}</p>
        <p>{project.created_at} (it need to be modified)</p>
      </div>
    </div>
  );
};

export default ProjectItem;
