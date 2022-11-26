import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { hashCode } from '../utils';

export default function CreateUser({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
  });

  const onCreateAccount = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    if (!username) {
      alert('Username is required');
    } else if (!password || !password2) {
      alert('Password is required');
    } else if (password !== password2) {
      alert('Passwords must have the same value');
    } else {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', hashCode(password));
      axios
        .post(`${process.env.REACT_APP_API_URL}/create-user`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          if (res.data.message === 'OK') {
            setUser(username);
            navigate('/tts-generator');
          } else {
            alert(res.data.message);
          }
        });
    }
  };

  return (
    <div className="block">
      <div className="about01">
        <span className="subtitle">Sign In</span>
      </div>
      <div
        className="card"
        style={{ width: '250px', height: '300px', marginTop: '50px' }}
      >
        <form
          className="form"
          onSubmit={onCreateAccount}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-around'
          }}
        >
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label>Username: </label>
              <input type="text" name="username" />
            </div>
            <div>
              <label>Password: </label>
              <input type="password" name="password" />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label>Repeat password: </label>
              <input type="password" name="password2" />
            </div>
          </div>
          <button className="button">CREATE ACCOUNT</button>
        </form>
      </div>
    </div>
  );
}
