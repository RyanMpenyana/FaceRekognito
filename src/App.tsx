import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLink/ImageLinkForm";
import FaceRecognition from "./components/FaceRecog/FaceRecognition";
import Ranking from "./components/Ranking/Ranking";
import Backgroundd from "./components/particlesjs/ParticlesBg";
import { useState, createContext } from "react";
import SignIn from "./components/sign-in/SignIn";

export const ctx = createContext(true);

const App = (props) => {
  const [inputState, setInputState] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [bool, setBool] = useState(false);

  const onInputChange = (e: any) => {
    setInputState(e.target.value);
    setBool(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setBool(true);
    setImgUrl(inputState);
    console.log("clicked");
    console.log(bool);
    setInputState("");
  };

  return (
    <>
      <ctx.Provider value={bool}>
        <Backgroundd />
        <div className="App">
          <Navigation />
          <Logo />
          <Ranking />
          <ImageLinkForm
            onChange={onInputChange}
            onSubmit={onSubmit}
            value={inputState}
          />
          <FaceRecognition imageUrl={imgUrl} />
        </div>
      </ctx.Provider>
    </>
  );
};
export default App;
