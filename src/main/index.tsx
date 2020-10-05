import React, { ChangeEvent, useState } from "react";
import ActionsBar from "./actions-bar";
import EditorLayout from "./editor-layout";
import Input from "./input";
import Output from "./output";

const defaultUserOutput = "Output...";

const Main = () => (
  <EditorLayout>
    <Input />
    <ActionsBar />
    <Output />
  </EditorLayout>
);

export default Main;