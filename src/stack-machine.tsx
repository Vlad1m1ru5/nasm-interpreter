import React, { useEffect, useState } from 'react'
import StringList from 'component/string-list'
import Program from 'program'

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
      <StringList items={program.data()}/>
      <StringList items={program.instructions()}/>
    </div>
  )
}

export default StackMachine