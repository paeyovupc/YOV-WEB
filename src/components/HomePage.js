import "../style/HomePage.css";
import initialPhoto from "../imatges/foto_inicial.svg";

export function HomePage() {
  return (
    <div className="backgroundColor">
      <header className="bigText">
        Your <span className="naranjito">Own </span>Voice
      </header>
      <p className="normalText">
        Your Own Voice uses the Coqui open-source API for Text-to-Speech
        generation. <br />
        The user can record their own voice or upload an audio file and based on
        their <br />
        selection can synthesise a provided text input.
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
