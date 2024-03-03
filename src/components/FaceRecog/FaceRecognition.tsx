import { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import Image from "../../assets/profile.jpg";

function App() {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // LOAD MODELS FROM USEEFFECT
  useEffect(() => {
    loadModels();
  }, []);

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
        <h1>Face Detection</h1>
        <div className="appimage">
          <img
            src={`https://t3.ftcdn.net/jpg/03/19/10/82/360_F_319108213_MoLZZt5WTXq6NpdG1FbCbyCtDStlSVBf.jpg`}
            ref={imageRef}
            crossOrigin="anonymous"
            alt="Face Detection"
            width={400}
            height={400}
          />
        </div>
        <canvas ref={canvasRef} className="appcanvas" />
      </div>
      ;
    </>
  );
}

export default App;
