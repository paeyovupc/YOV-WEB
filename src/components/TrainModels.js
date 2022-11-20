import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcOk, FcHighPriority, FcSynchronize, FcList } from 'react-icons/fc';
import axios from 'axios';
import { languages } from '../utils';

export default function TrainModels({ user }) {
  const language_list = Object.keys(languages);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState(undefined);
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (user == null) {
      navigate('/login');
    }

    async function getUsersModels() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users-models?user=${user}`
      );
      setModels(response.data);
    }
    getUsersModels();
  }, [navigate, user]);

  const trainModel = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', user);
    formData.append('language', languages[language]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/train-model`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        setModels((prevModels) => [...prevModels, res.data]);
      });
  };

  const getModelDetails = (model) => {
    const model_name = Object.keys(model)[0];
    const status = model[model_name]['status'];
    const progress = model[model_name]['progress'];

    return (
      <div style={{ display: 'flex', marginBottom: '10px' }} key={model_name}>
        <li style={{ fontSize: '16px', marginRight: '10px' }}>
          {model_name} →
        </li>
        {status === 'finished' && (
          <>
            <FcOk />
            <span style={{ marginLeft: '5px', color: 'green' }}>Finished</span>
          </>
        )}
        {status === 'running' && (
          <>
            <FcSynchronize />
            <span style={{ marginLeft: '5px', color: 'rgb(216, 95, 8)' }}>
              Running: {progress}%
            </span>
          </>
        )}
        {status === 'queued' && (
          <>
            <FcList />
            <span style={{ marginLeft: '5px', color: 'dodgerblue' }}>
              Queued
            </span>
          </>
        )}
        {status === 'error' && (
          <>
            <FcHighPriority />
            <span style={{ marginLeft: '5px', color: 'red' }}>Error</span>
          </>
        )}
      </div>
    );
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
        <div className="card" style={{ width: '45%' }}>
          <b style={{ fontSize: '20px' }}>Your current models</b>
          {models.length !== 0 && (
            <ul>{models.map((model) => getModelDetails(model))}</ul>
          )}
          {models.length === 0 && (
            <p>[INFO]: Currently, you have no personalized models trained</p>
          )}
        </div>
        <div className="card" style={{ width: '55%' }}>
          <b style={{ fontSize: '20px' }}>Train new model</b>
          <div style={{ marginTop: '20px' }}>
            <label>
              Upload your database:{' '}
              <input
                style={{ fontSize: '15px' }}
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <br />
            <label>
              Language:
              <select
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value={undefined} />
                {language_list.map((name, index) => (
                  <option key={index}>{name}</option>
                ))}
              </select>
            </label>
            <button className="button" onClick={trainModel}>
              Upload!
            </button>
            <p>Note: The database name corresponds to the .zip filename</p>
          </div>
        </div>
      </div>
    </div>
  );
}
