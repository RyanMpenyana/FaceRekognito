import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLink/ImageLinkForm";
import FaceRecognition from "./components/FaceRecog/FaceRecognition";
import Ranking from "./components/Ranking/Ranking";
import Backroundd from "./components/particlesjs/ParticlesBg";
import { useState } from "react";

const App = () => {
  const [inputState, setInputState] = useState("");

  const onInputChange = (e: any) => {
    setInputState(e.target.value);
  };
  const onSubmit = () => {
    console.log("clicked");
  };

  return (
    <>
      <div className="App">
        <Backroundd />
        <Navigation />
        <Logo />
        <Ranking />
        <ImageLinkForm onChange={onInputChange} onSubmit={onSubmit} />
        <FaceRecognition />
      </div>
    </>
  );
};
export default App;
