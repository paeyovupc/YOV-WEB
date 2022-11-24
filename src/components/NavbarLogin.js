import React, { useState, useRef } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function NavbarLogin({ user }) {
  const [dropdown, setDropdown] = useState(false);
  const dropLogOut = useRef(null);

  const closeOpenDropdown = (e) => {
    if (
      dropLogOut.current &&
      dropdown &&
      !dropLogOut.current.contains(e.target)
    ) {
      setDropdown(false);
    }
  };
  document.addEventListener('mousedown', closeOpenDropdown);

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Your <span className="orange-text">Own</span>Voice
      </Link>
      <ul>
        <CustomLink to="/tts-generator">TTS Generator</CustomLink>
        <CustomLink to="/train-models">Train models</CustomLink>
        <CustomLink to="/about">About Us</CustomLink>
        <CustomLink to="/technologies-used">Technologies Used</CustomLink>
        <div
          ref={dropLogOut}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '50px'
          }}
        >
          <button
            className={dropdown ? 'mini-avatar' : 'avatar'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {user.charAt().toUpperCase()}
          </button>
          <div style={dropdown ? { display: 'block' } : { display: 'none' }}>
            <CustomLink to="/login">
              <b>Log out</b>
            </CustomLink>
          </div>
        </div>
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
