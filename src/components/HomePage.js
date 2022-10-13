//import { HeaderOptions } from "./HeaderOptions";
import "../style/HomePage.css";
import initialPhoto from "../imatges/foto_inicial.svg";

export function HomePage() {
  return (
    <div className="backgroundColor">
      <header>
        <h1 className="bigText">
          Your <span className="naranjito">Own </span>Voice
        </h1>
      </header>
      <p className="normalText">
        Your Own Voice uses the Coqui open-source API for Text-to-Speech
        generation. <br />
        The user can record their own voice or upload an audio file and based on
        their selection can synthesise a provided text input.
      </p>

      <img
        src={initialPhoto}
        className="initialPhoto"
        alt="Foto de la homepage"
      ></img>

      {/* <StartButton />  */}
      <button className="startButton">
        {" "}
        Start Creating <br />
        Your <span className="naranjito">Own</span> Voice
      </button>
    </div>
  );
}
