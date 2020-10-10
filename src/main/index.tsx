import { css, Global } from "@emotion/core";
import React from "react";

import EditorLayout from "./editor-layout";
import Input from "./input";

const Main = () => (
  <>
    <EditorLayout>
      <Input />
    </EditorLayout>
    <Global styles={globalStyles} />
  </>
);

export default Main;

const globalStyles = css`
  html{
    font-family: Arial, Helvetica, sans-serif;
  }

  body {
    margin: 0;
    height: 100vh;
  }
`;