import { css, Global } from '@emotion/core'
import React, { useState } from 'react'

const StackMachine = React.lazy(() => import('stack-machine'))

const App: React.FunctionComponent = () => {

  const [asmCode, setAsmCode] = useState('')
  const [isUsingStackMachine, setIsInitStackMachine] = useState(false)

  const handleAsmCodeTextAreaChange = ({ target }:  React.ChangeEvent<HTMLTextAreaElement>) => {
    setAsmCode(target.value)
    
    if (isUsingStackMachine) {
      setIsInitStackMachine(false)
    }
  }

  const handleExecuteButtonClick = () => setIsInitStackMachine(true)

  const handleTerminateButtonClick = () => setIsInitStackMachine(false)

  return (
    <>
      <h1>ASM Interpreter</h1>
      <textarea 
        css={textAreaCss} 
        onChange={handleAsmCodeTextAreaChange} 
        placeholder='Код ассемблера...' 
      />
      <div>
        <button onClick={handleExecuteButtonClick} disabled={!asmCode.length}>Выполнить</button>
        <button onClick={handleTerminateButtonClick}>Прекратить</button>
      </div>
      {isUsingStackMachine && (
        <React.Suspense fallback='Подождите, выполняется интерпретация кода...'>
          <StackMachine code={asmCode}/>
        </React.Suspense>
      )}
      <Global styles={globalCss}/>
    </>
  )
}

export default App

const textAreaCss = css`
  resize: none;
  width: 50%;
  height: 50%;
`

const globalCss = css`
  html {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px;
  }

  body {
    margin: 0;
    height: 100vh;
  }

  #app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & textarea, button {
      font-size: inherit;
    }
  }
`