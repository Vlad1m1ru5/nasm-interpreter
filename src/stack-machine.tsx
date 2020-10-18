import React, { useEffect, useState } from 'react'
import StringList from 'component/string-list'

interface Props {
  code: string
}

const StackMachine: React.FunctionComponent<Props> = ({ code }) => {

  const [commands, setCommands] = useState<string[]>([])
  const [commandsCount, steCommandsCount] = useState(0)

  useEffect(() => {
    const commands = code
      .split('\n')
      .filter(isCommand => isCommand)

    setCommands(commands)    
    steCommandsCount(commands.length)
  }, [code])

  const handleStepButtonClick = () => {
    
  }

  return (
    <div>
      <button onClick={handleStepButtonClick}>Сделать шаг</button>
      <StringList items={dataList}/>
      <StringList items={instructionList}/>
    </div>
  )
}

export default StackMachine