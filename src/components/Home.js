import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/home-image.svg';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-grid">
      <div className="home01">
        <span className="title">
          Your<span className="orange-text">Own</span>Voice
        </span>
      </div>
      <div className="home02">
        <img src={logo} alt="home tts icon" height={450} />
      </div>
      <div className="home03">
        YourOwnVoice uses{' '}
        <a href="https://github.com/coqui-ai/TTS" style={{ color: 'white' }}>
          CoquiTTS
        </a>{' '}
        technology for Text-to-Speech generation. <br /> This tool allows the
        user to record their own voice or upload an audio file, <br /> choose
        the desired speech model and synthesise a personalized input text.
      </div>
      <div className="home04">
        <button
          className="button"
          style={{ fontSize: '18px' }}
          onClick={goToLogin}
        >
          Start creating <br /> Your<span className="orange-text">Own</span>
          Voice
        </button>
      </div>
    </div>
  );
}
