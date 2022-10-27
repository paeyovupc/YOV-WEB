import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Record() {
  const [file, setFile] = useState(null);
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', 'test'); // TODO
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
    <div>
      <div>
        <span className="subtitle">
          Upload your own audio for personalized TTS
        </span>
      </div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ fontSize: '18px' }}
      />
      <button className="button" onClick={onFileUpload}>
        Upload!
      </button>
    </div>
  );
}
