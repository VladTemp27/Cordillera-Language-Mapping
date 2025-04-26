import React from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import EmblaCarousel from "./EmblaCarousel/EmblaCarousel";

const OPTIONS = { loop: true }
const VIDEO_URLS = [
  "https://www.youtube.com/watch?v=0QO88x3lJVc", 
  "https://www.youtube.com/watch?v=L1nup3Y5iOw",
  ""
];

const VideoPlayer = () => {
  return (
    <div className="video-container">
      <h1>Explore Baguio City</h1>
      <EmblaCarousel slides={VIDEO_URLS} options={OPTIONS} />
    </div>
  );
};

export default VideoPlayer;
