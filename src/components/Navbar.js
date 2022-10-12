import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Your <span className="orange-text">Own</span>Voice
      </Link>
      <ul>
        <CustomLink to="/tts-generator">TTS Generator</CustomLink>
        <CustomLink to="/record">Personalized TTS</CustomLink>
        <CustomLink to="/about">About Us</CustomLink>
        <CustomLink to="/technologies-used">Technologies Used</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
