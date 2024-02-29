import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLink/ImageLinkForm";
import FaceRecognition from "./components/FaceRecog/FaceRecognition";
import Ranking from "./components/Ranking/Ranking";
import Backroundd from "./components/particlesjs/ParticlesBg";

const App = () => {
  return (
    <>
      <Backroundd />
      <div className="App">
        <Navigation />
        <Logo />
        <Ranking />
        <ImageLinkForm />
        <FaceRecognition />
      </div>
    </>
  );
};
export default App;
