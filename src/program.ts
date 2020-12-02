export default class Program {
  
  private readonly commands: string[]
  private nextCommandNumber: number
  private readonly dataStack: string[]
  private readonly commandsStack: string[]

  constructor(commands: string[]) {
    this.dataStack = []
    this.commandsStack = []
    this.nextCommandNumber = 0
    this.commands = commands
      .map(command => command.trim())
      .map(command => {
        const commentEntryIndex = command.indexOf('#')

        const commandLength = commentEntryIndex < 0 ? 
          command.length : 
          commentEntryIndex

        return command.slice(0, commandLength)
      })
      .filter(isCommand => isCommand)
  }

  next(): void {
    const executingCommand = this.commands[this.nextCommandNumber]
    const commandWords = this.getCommandWords(executingCommand)
    const [instruction, ...data] = this.getCommandKeyWords(commandWords)

    switch (instruction) {
      case 'push': {
        this.commandsStack.push('0001')
        this.dataStack.push(data[0])
        
        this.nextCommandNumber++
        break
      }
      case 'sub': {
        this.commandsStack.push('0010')
        const [firstNum, secondNum] = this.dataStack
          .splice(-2)
          .map(number => +number)
        
        this.dataStack.push((firstNum - secondNum).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'mul': {
        this.commandsStack.push('0011')
        const [firstNum, secondNum] = this.dataStack
          .splice(-2)
          .map(number => +number)
        
        this.dataStack.push((firstNum * secondNum).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'add': {
        this.commandsStack.push('0100')
        const [firstNum, secondNum] = this.dataStack
          .splice(-2)
          .map(number => +number)
  
        this.dataStack.push((firstNum + secondNum).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'cmp': {
        this.commandsStack.push('0101')
        const [firstNum, secondNum] = this.dataStack
          .splice(-2)
          .map(number => +number)
        
        this.dataStack.push((firstNum - secondNum).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'js': {
        this.commandsStack.push('0110')
        const [firstNum] = this.dataStack
          .splice(-1)
          .map(number => +number)

        if (firstNum < 0) {
          this.nextCommandNumber = this.commands
            .findIndex(command => command.indexOf(data[0] + ':') + 1)

          break
        }

        this.nextCommandNumber++
        break
      }
      default: {
        break
      }
    }
  }

  hasNext(): boolean {
    return this.nextCommandNumber < this.commands.length
  }

  data(): string[] {
    return this.dataStack
      .slice()
      .reverse()
  }

  executedCommands(): string[] {
    return this.commandsStack
      .slice()
  }

  private getCommandWords(command = ''): string[] {
    return command
      .split(' ')
      .map(word => word.trim())
      .filter(isWord => isWord)
  }

  private getCommandKeyWords(words: string[]): string[] {
    const isCommandWithMarker = words[0].slice(-1) === ':'
    const instruction = words[isCommandWithMarker ? 1 : 0]
    const data: string[] = words.slice(isCommandWithMarker ? 2 : 1)

    return [instruction, ...data]
  }
}