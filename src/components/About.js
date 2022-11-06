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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum." "Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </div>
      <div className="about03">
        <span className="subtitle">Our Team</span>
      </div>
      <div className="about04">
        <div className="card">
          <b style={{ fontSize: '18px' }}>Web Development Team</b>
          <p>
            The Web Development team is constituted by: <br />
            Gabriel Gómez, Sergi Espinosa and Roxana Ancuta. <br />
            <br />
            The main technologies used are React, a front-end <br />
            JavaScript library for building user interfaces, and CSS. <br />
            <br />
            This team was responsible of implementing a user-friendly and
            intuitive Web application that allows the user to synthesize a
            personalized text.
          </p>
          <img src={webdev_img} alt="web-development" width={100} />
        </div>
      </div>
      <div className="about05">
        <div className="card">
          <b style={{ fontSize: '18px' }}>TTS & Back-end Team</b>
          <p>
            The TTS and Back-end team is constituted by: <br />
            Raquel Panadero, Javier Fernández and Emiliano Macías. <br />
            <br />
            The technologies used are based on CoquiTTS, <br />
            a library for advanced Text-to-Speech generation. <br />
            <br />
            This team is responsible of training different models and <br />
            developing an API to connect the back-end with the front-end.
          </p>
          <img src={tts_img} alt="text-to-speech" width={100} />
        </div>
      </div>
      <div className="about06">
        <div className="card">
          <b style={{ fontSize: '18px' }}>Database Team</b>
          <p>
            The Database team is constituted by: <br />
            Lluc Ricart, Pablo Mecho and Helena Fitó. <br />
            <br />
            The technologies used are Python, data bases with at least 1 hour of
            data to be able record a new voice with the same frases. <br />
            <br />
            This team is responsible of making the audio data base available to
            work for TTS.
          </p>
          <img src={database_img} alt="database" width={100} />
        </div>
      </div>
    </div>
  );
}
