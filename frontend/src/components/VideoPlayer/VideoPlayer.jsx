import React from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  return (
    <div className="video-container">
      <h2>This is Baguio City</h2>
      <ReactPlayer url={"https://www.youtube.com/watch?v=L1nup3Y5iOw"} />
    </div>
  );
};

export default VideoPlayer;
