import { css } from "@emotion/core";
import React from "react";

interface Props {
  userInput: string;
  saveInput: () => {};
};

const Input: React.FunctionComponent<Props> = ({ userInput, saveInput }) => (
  <div css={inputCss}>
    <h2>User Input</h2>
    <textarea
      placeholder="Start typing..."
      css={textAreaCss}
      value={userInput}
      onChange={saveInput}
    />
  </div>
);

export default Input;

const inputCss = css`
  flex-grow: 1;
`;

const textAreaCss = css`
  resize: none;
  font-size: inherit;
  font-family: inherit;
  width: 100%;
  height: 100%;
`;