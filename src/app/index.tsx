import { css, Global } from '@emotion/core'
import React, { useState } from 'react'

const App: React.FunctionComponent = () => {

  const [asmCode, setAsmCode] = useState('')

  const asmCodeOnChange = ({ target }:  React.ChangeEvent<HTMLTextAreaElement>) => {
    const asmCode = target.value

    setAsmCode((asmCurrentCode) => asmCode)
  }

  return (
    <>
      <textarea 
        css={textAreaCss} 
        onChange={asmCodeOnChange} 
        placeholder='Код ассемблера...' 
      />
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
    font-size: 14px;
  }

  body {
    margin: 0;
    height: 100vh;
  }

  #app {
    width: 100%;
    height: 100%;
  }
`