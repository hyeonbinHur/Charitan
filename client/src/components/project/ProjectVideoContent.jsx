import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const ProjectVideoContent = ({ video_1, video_2, video_3, video_4 }) => {
  return (
    <div>
      <ScrollArea className="border-2 border-gray-300 p-2 rounded-md  overflow-x-auto">
        <div className="flex space-x-4">
          {video_1 && video_1 !== "" && (
            <video controls className=" w-96">
              <source src={video_1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {video_2 && video_2 !== "" && (
            <video controls className="w-96">
              <source src={video_2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {video_3 && video_3 !== "" && (
            <video controls className="w-96">
              <source src={video_3} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {video_4 && video_4 !== "" && (
            <video controls className="w-96">
              <source src={video_4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProjectVideoContent;
