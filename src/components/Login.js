import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { hashCode } from '../utils';

export default function Login({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
  });

  const onLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (!username) {
      alert('Username is required');
    } else if (!password) {
      alert('Password is required');
    } else {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', hashCode(password));
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          if (res.data.message === 'OK') {
            setUser(username);
            navigate('/tts-generator');
          } else {
            alert('Incorrect email or password');
          }
        });
    }
  };

  return (
    <div className="block">
      <div className="about01">
        <span className="subtitle">Log In</span>
      </div>
      <div
        className="card"
        style={{ width: '250px', height: '300px', marginTop: '50px' }}
      >
        <form
          className="form"
          onSubmit={onLogin}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '80%',
            justifyContent: 'space-around'
          }}
        >
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label>Username: </label>
              <input type="text" name="username" />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" />
            </div>
          </div>
          <button className="button">LOG IN</button>
        </form>
        <hr />
        <div>
          No account?{' '}
          <Link to="/create-user" style={{ color: 'white' }}>
            <b>Create one</b>
          </Link>
        </div>
      </div>
    </div>
  );
}
