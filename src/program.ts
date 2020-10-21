export default class Program {
  
  private readonly commands: string[]
  private nextCommandNumber: number
  private readonly dataStack: string[]

  constructor(commands: string[]) {
    this.dataStack = []
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
    const [instruction, ...data] = this.getCommandKeyWords(executingCommand)

    switch (instruction) {
      case 'push': {
        this.dataStack.push(data[0])
        
        this.nextCommandNumber++
        break
      }
      case 'subtract': {
        const [left, right] = this.dataStack
          .splice(-2)
          .map(number => +number)
        
        this.dataStack.push((left - right).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'multiply': {
        const [left, right] = this.dataStack
          .splice(-2)
          .map(number => +number)
        
        this.dataStack.push((left * right).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'add': {
        const [left, right] = this.dataStack
          .splice(-2)
          .map(number => +number)
  
        this.dataStack.push((left + right).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'cmp': {
        const [left, right] = this.dataStack
          .splice(-2)
          .map(number => +number)
        
        this.dataStack.push((left - right).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'js': {
        const [left] = this.dataStack
          .splice(-1)
          .map(number => +number)

        if (left < 0) {
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

  private getCommandKeyWords(command = ''): string[] {
    const words = command
      .split(' ')
      .map(word => word.trim())
      .filter(isWord => isWord)

    const isCommandWithMarker = words[0].slice(-1) === ':'
    const instruction = words[isCommandWithMarker ? 1 : 0]
    const data: string[] = words.slice(isCommandWithMarker ? 2 : 1)

    return [instruction, ...data]
  }
}