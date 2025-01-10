import { useState } from "react";
import { Button } from "../ui/button";

const ProjectVideoInput = ({ onAddVideo, currentVideoCount, maxVideos }) => {
  const [video, setVideo] = useState({});
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
      <input type="file" onChange={handleVideoUpload} accept="video/*" />
      {video.url && (
        <video
          src={video.url}
          controls
          style={{ width: "300px", margin: "10px 0" }}
        />
      )}
    </>
  );
};

const ProjectVideoForm = () => {
  const [videos, setVideos] = useState([]);
  const [videoInputs, setVideoInputs] = useState([1]); // 배열로 초기화
  const maxVideos = 4;

  const addVideo = (video) => {
    if (videos.length < maxVideos) {
      setVideos((prevVideos) => [...prevVideos, video]); // 새로운 비디오 추가
    }
  };

  const addVideoInput = () => {
    if (videoInputs.length < maxVideos) {
      setVideoInputs((prevInputs) => [...prevInputs, prevInputs.length + 1]); // 새로운 입력 추가
    } else {
      alert(`최대 ${maxVideos}개의 비디오 입력만 추가할 수 있습니다.`);
    }
  };

  return (
    <div>
      <h1>비디오 업로드</h1>
      {videoInputs.length < 4 && (
        <Button onClick={addVideoInput}>Add more video</Button>
      )}
      {videoInputs.map((_, i) => (
        <div key={`video-input-${i}`}>
          <ProjectVideoInput
            onAddVideo={addVideo}
            currentVideoCount={videos.length}
            maxVideos={maxVideos}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectVideoForm;
