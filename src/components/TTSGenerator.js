import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiDownload } from 'react-icons/hi';
import '../styles/TTSGenerator.css';

export default function TTSGenerator() {
  const [models, setModels] = useState([]);
  const [model, setModel] = useState({
    language: '',
    dataset: '',
    model_name: ''
  });
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getModels() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/all_models`
      );
      setModels(response.data);
    }
    getModels();
  }, []);

  const getTTSAudio = (data) => {
    setLoader(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/tts`, data, {
        responseType: 'blob'
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setLoader(false);
        setAudioUrl(url);
      });
  };

  const downloadAudio = () => {
    const element = document.createElement('a');
    element.href = audioUrl;
    element.download = 'yov-audio.wav';
    element.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModel((prevState) => {
      let new_model = {};
      switch (name) {
        case 'language':
          new_model = {
            language: value,
            dataset: '',
            model_name: ''
          };
          break;
        case 'dataset':
          new_model = {
            ...prevState,
            dataset: value,
            model_name: ''
          };
          break;
        default:
          new_model = {
            ...prevState,
            model_name: value
          };
          break;
      }
      return new_model;
    });
  };

  const handleSubmit = (e) => {
    if (
      model.language === '' ||
      model.dataset === '' ||
      model.model_name === ''
    ) {
      alert(
        'Language, Dataset and Model name are required to generate the output speech.'
      );
      e.preventDefault();
      return;
    }
    setAudioUrl(null);
    const data = {
      ...model,
      text: text
    };
    getTTSAudio(data);
    e.preventDefault();
  };

  const languages = [...new Set(models.map((item) => item.language))];
  const datasets = [...new Set(models.map((item) => item.dataset))];
  const model_names = [...new Set(models.map((item) => item.model_name))];
  return (
    <div className="block">
      <div className="subtitle">Text-to-speech generator</div>
      <form onSubmit={handleSubmit}>
        <div className="block">
          <label>
            Language:
            <select
              name="language"
              value={model.language}
              onChange={handleChange}
            >
              <option value={undefined} />
              {languages.map((language, index) => (
                <option key={index}>{language}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Dataset:
            <select
              name="dataset"
              value={model.dataset}
              onChange={handleChange}
            >
              <option value={undefined} />
              {datasets
                .filter((d) =>
                  models.some(
                    (m) => m.language === model.language && m.dataset === d
                  )
                )
                .map((dataset, index) => (
                  <option key={index}>{dataset}</option>
                ))}
            </select>
          </label>
          <br />
          <label>
            Model name:
            <select
              name="model_name"
              value={model.model_name}
              onChange={handleChange}
            >
              <option value={undefined} />
              {model_names
                .filter((name) =>
                  models.some(
                    (m) =>
                      m.language === model.language &&
                      m.dataset === model.dataset &&
                      m.model_name === name
                  )
                )
                .map((name, index) => (
                  <option key={index}>{name}</option>
                ))}
            </select>
          </label>
          <div className="block">
            <span>Enter some text to generate speech:</span>
            <br />
            <textarea
              type="text"
              value={text}
              cols="70"
              rows="5"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="button"
              onClick={(e) => setText('')}
            >
              Clear text
            </button>
            <input
              type="submit"
              className="button"
              value="Submit"
              style={{ fontWeight: 'bold' }}
            />
          </div>
        </div>
      </form>
      {loader && <span className="loader" />}
      {audioUrl && (
        <>
          <span>Generated audio:</span>
          <div className="result">
            <audio src={audioUrl} controls></audio>
            <button className="icon" onClick={downloadAudio}>
              <HiDownload size={30} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
