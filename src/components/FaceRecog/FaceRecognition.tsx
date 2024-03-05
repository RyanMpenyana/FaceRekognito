import { useRef, useEffect, useState, useContext } from "react";
import * as faceapi from "face-api.js";
import { animated, useTransition } from "react-spring";
import { ctx } from "../../App";
import Image from "../../assets/profile.jpg";

function FaceRecognition(props: any) {
  const myContext = useContext(ctx);
  const [isItem, setItem] = useState(true);
  const transition = useTransition(isItem, {
    from: { x: -800, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 800, y: 800, opacity: 0 },
  });
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // LOAD MODELS FROM USEEFFECT
  useEffect(() => {
    loadModels();
    setItem(myContext);
  }, [props.imageUrl, isItem]);

  // LOAD MODELS FROM FACE API
  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]);

    // Perform face detection once models are loaded
    detectFaces();
  };

  const detectFaces = async () => {
    const img = imageRef.current;
    const canvas = canvasRef.current;

    if (img && img.complete && img.naturalWidth !== 0) {
      // Image is loaded and ready
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      // Draw face detections on the canvas
      const displaySize = { width: img.width, height: img.height };
      faceapi.matchDimensions(canvas, displaySize);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    } else {
      // Image is not yet loaded or image reference is not assigned, retry after a short delay
      setTimeout(detectFaces, 100);
    }
  };
  return (
    <>
      <div className="myapp">
        <div className="appimage">
          {transition((style, item) => (
            <animated.div style={style}>
              {item ? (
                <img
                  src={props.imageUrl}
                  ref={imageRef}
                  crossOrigin="anonymous"
                  alt="Face Detection"
                  width={400}
                  height={400}
                />
              ) : (
                ""
              )}
            </animated.div>
          ))}
          <canvas ref={canvasRef} className="appcanvas" />
        </div>
      </div>
    </>
  );
}

export default FaceRecognition;
