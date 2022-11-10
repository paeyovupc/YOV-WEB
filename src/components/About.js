import React from 'react';
import '../styles/About.css';
import webdev_img from '../images/web-development.png';
import database_img from '../images/database.png';
import tts_img from '../images/text-to-speech.png';

export default function About() {
  return (
    <div className="about-grid">
      <div className="about01">
        <span className="subtitle">About Us</span>
      </div>
      <div className="about02">
        The team is made of 10 engineering students of Universitat Politècnica de Catalunya. We are a group of developers that have the idea 
        of developing a TTS so we divided in 3 main groups which are Web Development Team, TTS & Back-end Team and Database Team.

      </div>
      <div className="about03">
        <span className="subtitle">Our Team</span>
      </div>
      <div className="about04">
        <div className="card">
          <b>Web Development Team</b>
          <p>
            The Web Development team is constituted <br/>by: Gabriel Gómez, Sergi Espinosa, 
            Roxana Ancuta. The technology used is Javascript/React 
            and HTML/CSS. This team was responsible for the front end and leaving 
            back end ready to conect.
            <br/>
            <br/>
            <br/>
          </p>
          <img src={webdev_img} alt="web-development" width={100} />
        </div>
      </div>
      <div className="about05">
        <div className="card">
          <b>TTS & Back-end Team</b>
          <p>
            The TTS and Back-end team is constituted<br/>by: Raquel Panadero, Javier Fernández, 
            Emiliano Macías. The technology used is CoquiTTS and GlowTTS models. This team 
            is responsible of taking the audios of the Data base and developing models to 
            be able to use as a TTS and connecting it through backend with the page.
          </p>
          <img src={tts_img} alt="text-to-speech" width={100} />
        </div>
      </div>
      <div className="about06">
        <div className="card">
          <b>Database Team</b>
          <p>
            The Database team is constituted <br/>by: Lluc Ricart, Pablo Mecho, Helena Fitó. 
            The technology used where data bases with at least 1 hour of data to be able 
            record a new voice with the same frases. This team is responsible for making 
            the audio data base available to work for TTS.
            <br/>
            <br/>
          </p>
          <img src={database_img} alt="database" width={100} />
        </div>
      </div>
    </div>
  );
}
