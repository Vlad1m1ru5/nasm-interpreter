import { css } from "@emotion/core";
import React from "react";

const EditorLayout: React.FunctionComponent = ({ children }) => (
  <div css={editorLayoutCss}>
    <h1>NASM Web Interpreter</h1>
    {children}
  </div>
);

export default EditorLayout;

const editorLayoutCss = css`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;