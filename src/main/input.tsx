import { css } from "@emotion/core";
import React from "react";

type Props = {
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

const inputCss = css``;

const textAreaCss = css`
  resize: none;
`;