import { css, Global } from "@emotion/core";
import React, { useState } from "react";

interface Props {
  executeCode: (code: String) => {};
};

const Main: React.FunctionComponent<Props> = ({ executeCode }) => {

  const [userInput, setUserInput] = useState("");

  const stageUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.persist();
    setUserInput(currentUserInput => event.target.value);
  };

  const processUserInput = () => {
    executeCode(userInput);
  };

  return (
    <>
      <h1>NASM Web Interpreter</h1>
      <h2>User Input</h2>
      <textarea
        css={textAreaCss}
        placeholder="Start typing..."
        onChange={stageUserInput}
      />
      <div>
        <button onClick={processUserInput}>Сделать шаг</button>
      </div>
      <Global styles={globalStyles} />
    </>
  );
};

export default Main;

const globalStyles = css`
  html{
    font-family: Arial, Helvetica, sans-serif;
  }

  body {
    margin: 0;
    padding-left: 300px;
    padding-right: 300px;
  }
`;

const textAreaCss = css`
  resize: none;
  font-size: inherit;
  font-family: inherit;
  width: 100%;
  height: 500px;
`;