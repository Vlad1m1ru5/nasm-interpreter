import { css } from "@emotion/core";
import React from "react";

type Props = {
  userOutput: string;
};

const Output: React.FunctionComponent<Props> = ({ userOutput }) => (
  <div css={outputCss}>
    <h2>User Output</h2>
    <span css={spanCss}>{userOutput}</span>
  </div>
);

export default Output;

const outputCss = css``;

const spanCss = css``;