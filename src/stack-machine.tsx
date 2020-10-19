import { css } from '@emotion/core'
import Program from 'program'
import React, { useEffect, useState } from 'react'
import StringList from 'component/string-list'

interface Props {
  code: string
}

const StackMachine: React.FunctionComponent<Props> = ({ code }) => {

  const [commands, setCommands] = useState<string[]>([])
  const [currentCommandNumber, setCurrentCommandNumber] = useState(0)
  const [program, setProgram] = useState(new Program([]))

  useEffect(() => {
    const commands = code
      .split('\n')
      .filter(isCommand => isCommand)

    setCommands(commands)
    setCurrentCommandNumber(0)
    setProgram(new Program(commands))
  }, [code])

  const handleDoStepButtonClick = () => {
    program.next()
    setCurrentCommandNumber(currentCommandNumber => currentCommandNumber++)
  }

  return (
    <div>
      <div>Шаг {currentCommandNumber} из {commands.length}</div>
      <button onClick={handleDoStepButtonClick}>Сделать шаг</button>
      <div css={listsContainerCss}>
        <StringList items={program.data()}/>
        <StringList items={program.instructions()}/>
      </div>
    </div>
  )
}

export default StackMachine

const listsContainerCss = css`
  display: flex;
  justify-content: space-evenly;
`