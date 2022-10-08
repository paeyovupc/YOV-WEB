import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TTSGenerator() {
  const [models, setModels] = useState([]);
  const [model, setModel] = useState({
    language: '',
    dataset: '',
    model_name: ''
  });
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);

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
    axios
      .post(`${process.env.REACT_APP_API_URL}/tts`, data, {
        responseType: 'blob'
      })
      .then((res) => {
        console.log(res.data); //, new Blob(res.data));
        const url = URL.createObjectURL(res.data);
        setAudioUrl(url);
      });
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
    setAudioUrl(null);
    const data = {
      ...model,
      text: text
    };
    console.log(data);
    getTTSAudio(data);
    e.preventDefault();
  };

  const languages = [...new Set(models.map((item) => item.language))];
  const datasets = [...new Set(models.map((item) => item.dataset))];
  const model_names = [...new Set(models.map((item) => item.model_name))];
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <label>
          Dataset:
          <select name="dataset" value={model.dataset} onChange={handleChange}>
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
        <div>
          Enter some text to generate speech:
          <div>
            <textarea
              type="text"
              name="name"
              value={text}
              cols="20"
              rows="2"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <input type="submit" value="Submit" />
      </form>
      {audioUrl && <audio src={audioUrl} controls></audio>}
    </div>
  );
}
