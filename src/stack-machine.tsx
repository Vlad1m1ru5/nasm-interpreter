import React, { useEffect, useState } from 'react'
import StringList from 'component/string-list'
import HarvardArchitectureComputer from 'harvard-architecture-computer'

interface Props {
  code: string
}

const StackMachine: React.FunctionComponent<Props> = ({ code }) => {

  const [commands, setCommands] = useState<string[]>([])
  const [currentCommandNumber, setCurrentCommandNumber] = useState(0)
  const [harvardArchitectureComputer, setHarvardArchitectureComputer] = useState(new HarvardArchitectureComputer([]))

  useEffect(() => {
    const commands = code
      .split('\n')
      .filter(isCommand => isCommand)

    setCommands(commands)
    setCurrentCommandNumber(0)
    setHarvardArchitectureComputer(new HarvardArchitectureComputer(commands))
  }, [code])

  const handleDoStepButtonClick = () => {
    harvardArchitectureComputer.next()
    setCurrentCommandNumber(currentCommandNumber => currentCommandNumber++)
  }

  return (
    <div>
      <div>Шаг {currentCommandNumber} из {commands.length}</div>
      <button onClick={handleDoStepButtonClick}>Сделать шаг</button>
      <StringList items={harvardArchitectureComputer.data()}/>
      <StringList items={harvardArchitectureComputer.instructions()}/>
    </div>
  )
}

export default StackMachine