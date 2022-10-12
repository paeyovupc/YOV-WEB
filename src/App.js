import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Record from './components/Record';
import About from './components/About';
import Technologies from './components/Technologies';
import Footer from './components/Footer';
import TTSGenerator from './components/TTSGenerator';
import './styles/App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Record />} />
          <Route path="/about" element={<About />} />
          <Route path="/tts-generator" element={<TTSGenerator />} />
          <Route path="/technologies-used" element={<Technologies />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
