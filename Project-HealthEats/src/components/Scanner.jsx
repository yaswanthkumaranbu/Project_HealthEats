import React, { useRef, useEffect, useState } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";
import { Nav } from "./Nav/Nav";
import "./Scanner.css";

export function Scanner() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");

  const switchCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  const videoConstraints = {
    facingMode,
  };

  const runCoco = async () => {
    const net = await cocossd.load();
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        <button onClick={switchCamera} className="btn btn-primary">
          Switch Camera
        </button>
        <div style={{ position: "relative" }}>
          <Webcam
            ref={webcamRef}
            muted={true}
            videoConstraints={videoConstraints}
            // className="video-flip"
          />

          <canvas
            ref={canvasRef}
            // className="video-flip"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      </header>
    </div>
  );
}
