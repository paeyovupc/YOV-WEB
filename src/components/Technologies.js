import React from 'react';
import axios from 'axios';

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

  return (
    <div className="block">
      <div className="about01">
        <span className="subtitle">Technologies Used</span>
      </div>
      <div className="about02">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum." "Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </div>
      <a
        href="https://github.com/raquelpanapalen/PAE-YOV/blob/main/scripts/record_audio.py"
        style={{ color: 'white' }}
      >
        Python script to record audios
      </a>
      <a
        href="https://www.openslr.org/resources/69/ca_es_female.zip"
        style={{ color: 'white' }}
      >
        OpenSLR Female (CAT) [804M]
      </a>
      <a
        href="https://www.openslr.org/resources/69/ca_es_male.zip"
        style={{ color: 'white' }}
      >
        OpenSLR Male (CAT) [1.0G]
      </a>
      <a
        href="https://data.keithito.com/data/speech/LJSpeech-1.1.tar.bz2"
        style={{ color: 'white' }}
      >
        LJ Speech Dataset (EN) [2.6G]
      </a>
      <a>database 4</a>
      <a>database 5</a>

      <a onClick={downloadHelenaDB}>Our own database Female (CAT) </a>
    </div>
  );
}
