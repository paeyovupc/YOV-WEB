import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Record from './components/Record';
import About from './components/About';
import TTSGenerator from './components/TTSGenerator';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/record" element={<Record />} />
        <Route path="/about" element={<About />} />
        <Route path="/tts-generator" element={<TTSGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
