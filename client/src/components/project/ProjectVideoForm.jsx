import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SquarePlay } from "lucide-react";
import { Label } from "../ui/label";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
const ProjectVideoInput = ({
  onAddVideo,
  currentVideoCount,
  maxVideos,
  index,
}) => {
  const [video, setVideo] = useState({});
  const getVideoOrder = () => {
    if (index === 0) return "1st";
    if (index === 1) return "2nd";
    if (index === 2) return "3rd";
    if (index === 3) return "4th";
    return "";
  };
  const handleVideoUpload = (e) => {
    if (currentVideoCount >= maxVideos) {
      alert(`최대 ${maxVideos}개의 비디오만 업로드할 수 있습니다.`);
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const videoType = file.type.includes("video");
      const newVideo = {
        url: URL.createObjectURL(file),
        video: videoType,
      };
      setVideo(newVideo);
      onAddVideo(newVideo); // 부모 컴포넌트의 상태 업데이트
    }
  };
  return (
    <>
      <input
        type="file"
        id={`video-upload-${index}`}
        onChange={handleVideoUpload}
        accept="video/*"
        className="w-0 h-0 m-0 absolute invisible"
      />
      {video.url ? (
        <video
          key={`uploaded-video-${index}`}
          src={video.url}
          controls
          className="min-w-72 max-w-72"
        />
      ) : (
        <label
          htmlFor={`video-upload-${index}`}
          className="flex h-12 w-44 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 hover:bg-gray-100"
          title="Add New Video"
        >
          <SquarePlay
            size={24}
            className="mr-2 text-gray-600 cursor-pointer "
          />
          <Label
            htmlFor={`video-upload-${index}`}
            className="text-sm font-medium text-gray-600 cursor-pointer "
          >
            Add {getVideoOrder()} Video
          </Label>
        </label>
      )}
    </>
  );
};
const ProjectVideoForm = ({ addVideoOnParents }) => {
  const [videos, setVideos] = useState([]);
  const [videoInputs, setVideoInputs] = useState([1]); // 배열로 초기화
  const maxVideos = 4;
  const addVideo = (video) => {
    if (videos.length < maxVideos) {
      setVideos((prevVideos) => [...prevVideos, video]); // 새로운 비디오 추가
      addVideoOnParents(video);
    }
  };
  const addVideoInput = () => {
    if (videoInputs.length < maxVideos) {
      setVideoInputs((prevInputs) => [...prevInputs, prevInputs.length + 1]); // 새로운 입력 추가
    } else {
      alert(`${maxVideos} is exceed max num of videos.`);
    }
  };
  useEffect(() => {
    console.log(videos);
  }, [videos]);
  return (
    <div>
      <h1 className="text-xl mb-4">Upload Multimedia</h1>
      <ScrollArea className="border-2 border-gray-300 p-2 rounded-md">
        {videoInputs.length < 4 && (
          <Button className="mb-3" type="button" onClick={addVideoInput}>
            Add more video
          </Button>
        )}
        <div className="flex gap-5">
          {videoInputs.map((_, i) => (
            <div key={`video-input-${i}`}>
              <ProjectVideoInput
                index={i}
                onAddVideo={addVideo}
                currentVideoCount={videos.length}
                maxVideos={maxVideos}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProjectVideoForm;
