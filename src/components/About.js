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
          <b>Web Development Team</b>
          <p>
            Nunc congue efficitur felis non fermentum. Cras luctus luctus mi et
            tincidunt. Phasellus congue faucibus mauris, sit amet rhoncus magna
            scelerisque et. Duis convallis elit vestibulum, luctus erat id,
            tincidunt risus. Mauris gravida cursus nunc. Donec non hendrerit
            arcu, nec vulputate urna. Mauris in quam.
          </p>
          <img src={webdev_img} alt="web-development" width={100} />
        </div>
      </div>
      <div className="about05">
        <div className="card">
          <b>TTS & Back-end Team</b>
          <p>
            Nunc congue efficitur felis non fermentum. Cras luctus luctus mi et
            tincidunt. Phasellus congue faucibus mauris, sit amet rhoncus magna
            scelerisque et. Duis convallis elit vestibulum, luctus erat id,
            tincidunt risus. Mauris gravida cursus nunc. Donec non hendrerit
            arcu, nec vulputate urna. Mauris in quam.
          </p>
          <img src={tts_img} alt="text-to-speech" width={100} />
        </div>
      </div>
      <div className="about06">
        <div className="card">
          <b>Database Team</b>
          <p>
            Nunc congue efficitur felis non fermentum. Cras luctus luctus mi et
            tincidunt. Phasellus congue faucibus mauris, sit amet rhoncus magna
            scelerisque et. Duis convallis elit vestibulum, luctus erat id,
            tincidunt risus. Mauris gravida cursus nunc. Donec non hendrerit
            arcu, nec vulputate urna. Mauris in quam.
          </p>
          <img src={database_img} alt="database" width={100} />
        </div>
      </div>
    </div>
  );
}
