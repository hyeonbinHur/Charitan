import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProjectDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 w-[40rem]">
      <div>
        <Skeleton width="100%" height="100%" />
      </div>
      <p className="w-[40rem] h-[40rem]">
        <Skeleton width="100%" height="100%" />
      </p>
      <div>
        <Skeleton width="100%" height="100%" />
      </div>
      <div>
        <Skeleton width="100%" height="100%" />
      </div>
      <div className="w-full">
        <Skeleton width="100%" height="100%" />
        <Skeleton width="100%" height="100%" />
        <Skeleton width="100%" height="100%" />
        <Skeleton width="100%" height="100%" />
        <Skeleton width="100%" height="100%" />
      </div>

      <div className="flex justify-between gap-10">
        <div className="flex-1">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="flex-1">
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
      <div className="flex gap-10 justify-between">
        <div className="flex-1">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="flex-1">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="flex-1">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="flex-1">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="flex-1">
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailSkeleton;
