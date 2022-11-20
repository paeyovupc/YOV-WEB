import React from 'react';
import axios from 'axios';
import coquitts_img from '../images/coquiTTS.png';
import react_img from '../images/react.png';
import python_img from '../images/python.png';
import bash_img from '../images/bash.png';

export default function Technologies() {
  const downloadHelenaDB = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/get-database?name=helena_cat`,
        null,
        {
          headers: {
            'Content-Disposition': 'attachment; filename=helena_cat.zip',
            'Content-Type': 'application/zip'
          },
          responseType: 'arraybuffer'
        }
      )
      .then((res) => {
        console.log(res);
        const url = URL.createObjectURL(
          new Blob([res.data], { type: 'application/zip' })
        );
        const link = document.createElement('a');
        link.href = url;
        link.download = 'helena_cat.zip';
        link.click();
        URL.revokeObjectURL(url);
      });
  };

  const cardStyle = {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const subtitleStyle = {
    fontSize: '20px',
    marginBottom: '15px'
  };

  return (
    <div className="block">
      <div className="about01" style={{ marginTop: '25px' }}>
        <span className="subtitle">Technologies Used</span>
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
        <div className="card" style={cardStyle}>
          <b style={subtitleStyle}>CoquiTTS</b>
          <img src={coquitts_img} alt="CoquiTTS" height={60} />
          <p style={{ textAlign: 'justify' }}>
            We extended the current open-source TTS technology to obtain
            high-quality models in Catalan using CoquiTTS, a library for
            advanced Text-to-Speech generation.
            <br />
            <br />
            We also used the pretrained models in 20+ languages and tools for
            measuring dataset quality that CoquiTTS comes with.
          </p>
        </div>
        <div className="card" style={cardStyle}>
          <b style={subtitleStyle}>React</b>
          <img src={react_img} alt="React" height={60} />
          <p style={{ textAlign: 'justify' }}>
            We used React to create this interactive web application so that
            clients can easily register and train their own models. React is a
            free and open-source JavaScript library for building user interfaces
            based on UI components.
            <br />
            <br />
            We also used CSS to style the web application.
          </p>
        </div>
        <div className="card" style={cardStyle}>
          <b style={subtitleStyle}>Python</b>
          <img src={python_img} alt="Python" height={60} />
          <p style={{ textAlign: 'justify' }}>
            We developed an API to answer user requests using FastAPI. FastAPI
            is a modern, fast (high-performance), web framework for building
            APIs with Python 3.7+.
            <br />
            <br />
            Apart from that, we created some Python scripts to record audio
            files, normalize database metadata files and implement the training
            queue.
          </p>
        </div>
        <div className="card" style={cardStyle}>
          <b style={subtitleStyle}>Bash</b>
          <img src={bash_img} alt="Bash" height={60} />
          <p>Texto</p>
        </div>
      </div>
      More info:
      <table style={{ margin: '15px' }}>
        <thead style={{ fontWeight: 'bold' }}>
          <tr>
            <td>Links to databases</td>
            <td>Links to Python scripts</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a
                href="https://www.openslr.org/resources/69/"
                style={{ color: 'white' }}
              >
                - OpenSLR Female (CAT) [1.0G]
              </a>
            </td>
            <td>
              <a
                href="https://github.com/raquelpanapalen/PAE-YOV/blob/main/scripts/record_audio.py"
                style={{ color: 'white' }}
              >
                - Python script to record audios
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a
                href="https://www.openslr.org/resources/69/"
                style={{ color: 'white' }}
              >
                - OpenSLR Male (CAT) [767M]
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a
                href="https://keithito.com/LJ-Speech-Dataset/"
                style={{ color: 'white' }}
              >
                - LJ Speech Dataset (EN) [2.6G]
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a
                onClick={downloadHelenaDB}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                - Our own database Female (CAT) [4.3M]
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
