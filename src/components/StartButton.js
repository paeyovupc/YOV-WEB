import React from "react";
import styled from "styled-components";
import "../style/HomePage.css";

export function StartButton() {
  let mainColor = "#024959",
    hoverColor = "#073865";

  const Ttsbutton = styled.button`
    font-size: 1.2em;
    border: 1px solid black;
    font-weight: medium;
    color: white;
    background-color: ${mainColor};
    transition-duration: 0.6s;
    &:hover {
      background-color: ${hoverColor};
    }
    border-radius: 30px;
    padding: 20px 32px;
    margin: 5px;
    position: absolute;
    left: 240px;
    bottom: 180px;
    cursor: pointer;
  `;
  return (
    <Ttsbutton>
      START creating <br /> Your <span className="anotherColor">Own</span> Voice
    </Ttsbutton>
  );
}
