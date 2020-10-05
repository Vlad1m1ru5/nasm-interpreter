import { css } from "@emotion/core";
import React from "react";

type Props = {
  processInput: () => {};
  clearOutput: () => {};
};

const ActionsBar: React.FunctionComponent<Props> = ({ processInput, clearOutput }) => (
  <div css={actionsBarCss}>
    <button onClick={processInput}>Run</button>
    <button onClick={clearOutput}>Clear</button>
  </div>
);

export default ActionsBar;

const actionsBarCss = css``;