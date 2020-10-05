import { css } from "@emotion/core";
import React from "react";

type Props = {
  userInput: string;
  handleUserInput: () => {};
};

const Input: React.FunctionComponent<Props> = ({ userInput, handleUserInput }) => (
  <div css={inputCss}>
    <h2>User Input</h2>
    <textarea
      placeholder="Start typing..."
      css={textAreaCss}
      value={userInput}
      onChange={handleUserInput}
    />
  </div>
);

export default Input;

const inputCss = css``;

const textAreaCss = css``;