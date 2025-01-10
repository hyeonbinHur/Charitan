import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProjectItemSkeleton = () => {
  return (
    <div className="hover:shadow-2xl cursor-pointer border h-60 border-stone-500 rounded-lg flex gap-5 p-5">
      <div className="w-[15rem] h-full">
        <div className="w-full h-full bg-slate-600 rounded-md">
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between text-sm">
        <Skeleton width="20%" height="100%" />
        <Skeleton width="20%" height="100%" />
        <Skeleton width="15%" height="100%" />
        <Skeleton width="30%" height="100%" />
        <Skeleton width="30%" height="100%" />
        <Skeleton width="20%" height="100%" />
      </div>
    </div>
  );
};

export default ProjectItemSkeleton;
