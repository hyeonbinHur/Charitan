import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../ProjectStyles.css";

const ProjectItemSkeleton = () => {
  return (
    <div className="w-[21rem] cursor-pointer project-item text-gray-300 min-h-96 max-h-96 h-96 flex flex-col justify-between items-center p-4 border border-gray-700 rounded-lg shadow-lg transition-transform duration-300 hover:scale-101 hover:shadow-xl">
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <div
          alt="Charity Avatar"
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 blur-md brightness-50"
          loading="lazy"
        >
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
      <div className="project-details w-full mt-4">
        <h2 className="text-xl font-semibold h-10 overflow-hidden truncate text-white">
          <Skeleton width="30%" height="50%" />
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          <Skeleton width="70%" height="100%" />
        </p>
        <p className="project-category text-xs text-gray-300 mt-2">
          <Skeleton width="80%" height="100%" />
        </p>
        <p className="project-date text-xs text-gray-400 mt-1">
          <Skeleton width="60%" height="100%" />
        </p>
      </div>
    </div>
  );
};

export default ProjectItemSkeleton;
