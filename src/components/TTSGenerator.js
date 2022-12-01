import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiDownload } from 'react-icons/hi';
import '../styles/TTSGenerator.css';

export default function TTSGenerator({ user }) {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [model, setModel] = useState({
    language: '',
    dataset: '',
    model_name: ''
  });
  const [languageList, setLanguageList] = useState([]);
  const [datasetList, setDatasetList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [multispeaker_lang, setMultiLang] = useState('en');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user == null) {
      navigate('/login');
    }

    async function getModels() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/all-models?user=${user}`
      );
      const models = response.data;
      setModels(models);
      setLanguageList([...new Set(models.map((item) => item.language))].sort());
    }
    getModels();
  }, [navigate, user]);

  const getTTSAudio = (data) => {
    setLoader(true);
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('language', data.language);
    formData.append('dataset', data.dataset);
    formData.append('model_name', data.model_name);
    formData.append('text', data.text);
    formData.append('multispeaker_lang', multispeaker_lang);
    formData.append('user', user);
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_API_URL}/tts`, formData, {
        responseType: 'blob'
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setLoader(false);
        setMultiLang('en');
        setFile(null);
        setAudioUrl(url);
      });
  };

  const downloadAudio = () => {
    const element = document.createElement('a');
    element.href = audioUrl;
    element.download = 'yov-audio.wav';
    element.click();
  };

  const getPossibleDatasets = (language) => [
    ...new Set(
      models.filter((m) => m.language === language).map((m) => m.dataset)
    )
  ];

  const getPossibleModels = (language, dataset) => [
    ...new Set(
      models
        .filter((m) => m.language === language && m.dataset === dataset)
        .map((m) => m.model_name)
    )
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModel((prevState) => {
      let new_model = {};
      if (name === 'language') {
        new_model = {
          language: value,
          dataset: '',
          model_name: ''
        };
        const datasets = getPossibleDatasets(value);
        setDatasetList(datasets.sort());
        if (datasets.length === 1) {
          new_model.dataset = datasets[0];
          const models_list = getPossibleModels(value, new_model.dataset);
          setModelList(models_list.sort());
          if (models_list.length === 1) {
            new_model.model_name = models_list[0];
          }
        }
      } else if (name === 'dataset') {
        new_model = {
          ...prevState,
          dataset: value,
          model_name: ''
        };
        const models_list = getPossibleModels(new_model.language, value);
        setModelList(models_list.sort());
        if (models_list.length === 1) {
          new_model.model_name = models_list[0];
        }
      } else {
        new_model = {
          ...prevState,
          model_name: value
        };
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

  return (
    <div className="block">
      <div className="subtitle">Text-to-speech generator</div>
      <p
        style={{
          background: 'rgba(155, 155, 155, 0.5)',
          padding: '2px',
          borderRadius: '4px'
        }}
      >
        Note: Use <span>multilingual/multi-dataset/your_tts</span> and upload an
        audio with your own voice to generate personalized voices
      </p>
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
              {languageList.map((language, index) => (
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
              {datasetList.map((dataset, index) => (
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
              {modelList.map((name, index) => (
                <option key={index}>{name}</option>
              ))}
            </select>
          </label>
          {model.model_name === 'your_tts' && (
            <div>
              <label>
                Upload your own voice:
                <div>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ fontSize: '15px' }}
                  />
                </div>
              </label>
              <br />
              <label>
                Choose the language:
                <div onChange={(e) => setMultiLang(e.target.value)}>
                  <input type="radio" value="en" name="language" /> English
                  <input type="radio" value="fr-fr" name="language" /> French
                  <input type="radio" value="pt-br" name="language" />{' '}
                  Portuguese (Brazil)
                </div>
              </label>
            </div>
          )}
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
