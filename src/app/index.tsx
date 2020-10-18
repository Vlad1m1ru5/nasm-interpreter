import React, { TextareaHTMLAttributes, useState } from 'react'

const App: React.FunctionComponent = () => {

  const [asmCode, setAsmCode] = useState("");

  const asmCodeOnChange = ({ target }:  React.ChangeEvent<HTMLTextAreaElement>) => {
    const asmCode = target.value;

    setAsmCode(asmCode);
  }

  return (
    <>
      <textarea placeholder='Код ассемблера...' onChange={asmCodeOnChange}/>
    </>
  )
}

export default App