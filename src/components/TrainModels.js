import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TrainModels({ user }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (user == null) {
      navigate('/login');
    }

    async function getUsersModels() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users-models?user=${user}`
      );
      console.log(response);
      setModels(response.data);
    }
    getUsersModels();
  }, [navigate, user]);

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', user);
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_API_URL}/new-db-multispeaker`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="block">
      <div>
        <span className="subtitle">
          Upload your own database to train personalized models
        </span>
      </div>
      <div
        className="models-grid"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '50px',
          width: '80%'
        }}
      >
        <div className="card" style={{ width: '55%' }}>
          <b style={{ fontSize: '20px' }}>Your current models</b>
          {models.length !== 0 && (
            <ul>
              {models.map((model) => (
                <li
                  style={{ fontSize: '16px', marginBottom: '10px' }}
                  key={model}
                >
                  {model}
                </li>
              ))}
            </ul>
          )}
          {models.length === 0 && (
            <p>[INFO]: Currently, you have no personalized models trained</p>
          )}
        </div>
        <div className="card" style={{ width: '45%' }}>
          <b style={{ fontSize: '20px' }}>Train new model</b>
          <div>
            <input
              style={{ fontSize: '15px' }}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="button" onClick={onFileUpload}>
              Upload!
            </button>
            <p>Note: The database name corresponds to the .zip filename</p>
          </div>
        </div>
      </div>
    </div>
  );
}
