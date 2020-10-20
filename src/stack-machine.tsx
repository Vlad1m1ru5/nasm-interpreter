import Program from 'program'
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
      .filter(isCommand => isCommand)

    setCurrentCommandNumber(0)
    setProgram(new Program(commands))
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
      <StringList items={program.data()}/>
    </div>
  )
}

export default StackMachine