import { css } from '@emotion/core'
import Program from 'stack-machine/program'
import React, { useEffect, useState } from 'react'
import StringList from 'component/string-list'

interface Props {
  code: string
}

const StackMachine: React.FunctionComponent<Props> = ({ code }) => {

  const [currentCommandNumber, setCurrentCommandNumber] = useState(0)
  const [program, setProgram] = useState(new Program([]))

  useEffect(() => {
    const commands = code
      .split('\n')
      .map(command => command.trim())
      .map(command => {
        const commentEntryIndex = command.indexOf('#')

        const commandLength = commentEntryIndex < 0 ? 
          command.length : 
          commentEntryIndex

        return command.slice(0, commandLength)
      })
      .filter(isCommand => isCommand)

    setCurrentCommandNumber(0)
    setProgram(new Program(commands))
  }, [code])

  const handleDoStepButtonClick = () => {
    program.next()
    setCurrentCommandNumber(currentCommandNumber + 1)
  }

  return (
    <div>
      <h2>Stack Machine</h2>
      <div>Сделано шагов: {currentCommandNumber}</div>
      <button
        disabled={!program.hasNext()}
        onClick={handleDoStepButtonClick}
      >Сделать шаг</button>
      <div css={stacksGroupCss}>
        <StringList items={program.data()} />
        <StringList items={program.executedCommands()} />
      </div>
    </div>
  )
}

export default StackMachine

const stacksGroupCss = css`
  display: flex;
`