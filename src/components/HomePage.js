import { HeaderOptions } from "./HeaderOptions";
import "../style/HomePage.css";
import foto_inicial from "../imatges/foto_inicial.svg";
import { StartButton } from "./StartButton";

export function HomePage() {
  return (
    <div>
      <header>
        <h1>Your Own Voice</h1>
      </header>
      <HeaderOptions />
      <main>
        <p>
          Your Own Voice uses the Coqui open-source API for Text-to-Speech
          generation. The user can record their own voice or upload an audio
          file and based on their selection can synthesise a provided text
          input.
        </p>

        <img
          src={foto_inicial}
          className="foto_inicial"
          alt="Foto de la homepage"
        ></img>

        <StartButton />
      </main>
    </div>
  );
}
