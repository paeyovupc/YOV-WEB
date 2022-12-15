import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcOk, FcHighPriority, FcSynchronize, FcList } from "react-icons/fc";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import { languages } from "../utils";

export default function TrainModels({ user }) {
  const language_list = Object.keys(languages);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState(undefined);
  const [fineTuning, setFineTuning] = useState(false);
  const [gender, setGender] = useState(null);
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (user == null) {
      navigate("/login");
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
    formData.append("file", file);
    formData.append("user", user);
    formData.append("language", languages[language]);
    formData.append("voice_type", gender);

    axios
      .post(`${process.env.REACT_APP_API_URL}/train-model`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setModels((prevModels) => [...prevModels, res.data]);
      });
  };

  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/check-database-name?username=${user}&db_name=${
          file.name.split(".")[0]
        }`
      )
      .then((res) => {
        if (res.data.check === "OK") {
          setFile(file);
        } else {
          setFile(null);
          alert(
            "The database name is already used. Choose another database name."
          );
        }
      });
  };

  const getZipStructure = () => {
    return (
      <div
        style={{
          background: "rgba(155, 155, 155, 0.5)",
          width: "max-content",
          borderRadius: "10px",
          padding: "10px",
          marginTop: "5px",
          marginBottom: "15px",
        }}
      >
        my_database.zip
        <br />│
        <br />
        └── my_database
        <div style={{ marginLeft: "35px" }}>
          │<br />
          ├── wavfile01.wav
          <br />
          ├── wavfile02.wav
          <br />│ ... <br />
          ├── wavfileN.wav <br />
          └── metadata.txt
        </div>
      </div>
    );
  };

  const getModelDetails = (model) => {
    const model_name = Object.keys(model)[0];
    const status = model[model_name]["status"];
    const progress = model[model_name]["progress"];

    return (
      <div style={{ display: "flex", marginBottom: "10px" }} key={model_name}>
        <li style={{ fontSize: "16px", marginRight: "10px" }}>
          {model_name} →
        </li>
        {status === "finished" && (
          <>
            <FcOk />
            <span style={{ marginLeft: "5px", color: "green" }}>Finished</span>
          </>
        )}
        {status === "running" && (
          <>
            <FcSynchronize />
            <span style={{ marginLeft: "5px", color: "rgb(216, 95, 8)" }}>
              Running: {progress}%
            </span>
          </>
        )}
        {status === "queued" && (
          <>
            <FcList />
            <span style={{ marginLeft: "5px", color: "dodgerblue" }}>
              Queued
            </span>
          </>
        )}
        {status === "error" && (
          <>
            <FcHighPriority />
            <span style={{ marginLeft: "5px", color: "red" }}>Error</span>
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
          display: "flex",
          justifyContent: "space-around",
          margin: "50px",
          width: "80%",
        }}
      >
        <div className="card" style={{ width: "45%" }}>
          <b style={{ fontSize: "20px" }}>Your current models</b>
          {models.length !== 0 && (
            <ul>{models.map((model) => getModelDetails(model))}</ul>
          )}
          {models.length === 0 && (
            <p>[INFO]: Currently, you have no personalized models trained</p>
          )}
        </div>
        <div className="card" style={{ width: "55%" }}>
          <b style={{ fontSize: "20px" }}>Train new model</b>
          <div style={{ marginTop: "20px" }}>
            <label className="custom-file-upload">
              <MdCloudUpload />
              <span style={{ marginLeft: "5px" }}>
                {file === null ? "Upload your database" : file.name}
              </span>
              <input
                type="file"
                className="inputfile"
                onChange={(e) => onChangeFile(e)}
                hidden
              />
            </label>
            <div>
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
              <input
                type="checkbox"
                checked={fineTuning}
                onChange={() => {
                  setFineTuning((prevState) => !prevState);
                  setGender(null);
                }}
                value="Fine-Tuning"
              />
              <label>Fine-Tuning</label>
            </div>
            {fineTuning && (
              <div>
                <label>
                  Type of speaker voice:
                  <div onChange={(e) => setGender(e.target.value)}>
                    <input type="radio" value="female" name="gender" /> Female
                    Voice
                    <input type="radio" value="male" name="gender" /> Male Voice
                  </div>
                </label>
              </div>
            )}
            <button className="button" onClick={trainModel}>
              Upload!
            </button>
            <div style={{ marginTop: "20px" }}>
              Notes:
              <br />- For a 5-10 minute database select the fine tuning option.
              <br />- The database name corresponds to the .zip filename
              <br />
              - The .zip file must contain a folder with the same database name
              <br />- The database folder must contain all audios and metadata
              file. <br /> - The metadata file must have the following format
              <div
                style={{
                  background: "rgba(155, 155, 155, 0.5)",
                  width: "max-content",
                  borderRadius: "10px",
                  padding: "2px",
                  marginBottom: "10px",
                }}
              >
                {
                  "<wav_file_name_without_extension>|<Transcription of WAV file>"
                }
              </div>
              Example:
              {getZipStructure()}
              For more info on how to create your own database follow this{" "}
              <a
                href="https://github.com/raquelpanapalen/PAE-YOV/tree/main/databases#databases"
                style={{ color: "white" }}
              >
                link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
