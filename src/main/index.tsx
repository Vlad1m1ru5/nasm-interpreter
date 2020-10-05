import React, { ChangeEvent, useState } from "react";

const Main = () => {
  
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  }

  return (
    <div>
      <h1>NASM Web Interpreter</h1>
      <div>
        <h2>User Input</h2>
        <textarea value={userInput} onChange={handleUserInput}>

        </textarea>
      </div>
      <div>
        <h2>User Output</h2>
        <span>

        </span>
      </div>
    </div>
  );
};

export default Main;