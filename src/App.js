import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NavbarLogin from './components/NavbarLogin';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import TrainModels from './components/TrainModels';
import About from './components/About';
import Technologies from './components/Technologies';
import Footer from './components/Footer';
import TTSGenerator from './components/TTSGenerator';
import './styles/App.css';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {!user && <Navbar />} {user && <NavbarLogin user={user} />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/create-user"
            element={<CreateUser setUser={setUser} />}
          />
          <Route path="/train-models" element={<TrainModels user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/tts-generator" element={<TTSGenerator user={user} />} />
          <Route path="/technologies-used" element={<Technologies />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
