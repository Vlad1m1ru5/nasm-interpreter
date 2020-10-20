import { css } from '@emotion/core'
import ProgramImpl from 'program'
import React, { useEffect, useState } from 'react'
import StringList from 'component/string-list'

interface Props {
  code: string
}

const StackMachine: React.FunctionComponent<Props> = ({ code }) => {

  const [currentCommandNumber, setCurrentCommandNumber] = useState(0)
  const [program, setProgram] = useState(new ProgramImpl([]))

  useEffect(() => {
    const commands = code
      .split('\n')
      .filter(isCommand => isCommand)

    setCurrentCommandNumber(0)
    setProgram(new ProgramImpl(commands))
  }, [code])

  const handleDoStepButtonClick = () => {
    if (program.hasNext()) {
      program.next()
      setCurrentCommandNumber(currentCommandNumber + 1)
    }
  }

  return (
    <div>
      <div>Сделано шагов: {currentCommandNumber}</div>
      <button onClick={handleDoStepButtonClick}>Сделать шаг</button>
      <div css={listsWrapperCss}>
        <StringList items={program.data()}/>
        <StringList items={program.instructions()}/>
      </div>
    </div>
  )
}

export default StackMachine

const listsWrapperCss = css`
  display: flex;
  justify-content: space-evenly;
`