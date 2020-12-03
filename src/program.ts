export default class Program {
  
  private readonly commands: string[]
  private readonly dataStack: string[]
  private readonly commandsStack: string[]
  private counter: number
  private nextCommandNumber: number
  private carry: number

  constructor(commands: string[]) {
    this.dataStack = []
    this.commandsStack = []
    this.carry = 0
    this.counter = 0
    this.nextCommandNumber = 0
    this.commands = commands
  }

  next(): void {
    const executingCommand = this.commands[this.nextCommandNumber]
    const commandWords = this.getCommandWords(executingCommand)
    const [instruction, ...data] = this.getCommandKeyWords(commandWords)

    switch (instruction) {
      case 'push': {
        this.commandsStack.push('0x0001')

        this.dataStack.push(data[0])
        
        this.nextCommandNumber++
        break
      }
      case 'sub': {
        this.commandsStack.push('0x0002')

        const [secondNum, firstNum] = this.dataStack
          .splice(-2)
          .map(number => +number)
        
        this.dataStack.push((firstNum - secondNum).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'mul': {
        this.commandsStack.push('0x0003')

        const [firstNum, secondNum] = this.dataStack
          .splice(-2)
          .map(number => +number)
        
        /**
         * 65536 >> 16
         * 1
         */
        const binaryResultString = (firstNum * secondNum).toString(2)
        const greater = parseInt(binaryResultString.slice(0, 15), 2)
        const minor = parseInt(binaryResultString.slice(16, binaryResultString.length), 2) || 0

        this.carry = greater
        this.dataStack.push(minor.toString())

        this.nextCommandNumber++
        break
      }
      case 'add': {
        this.commandsStack.push('0x0004')

        const [firstNum, secondNum] = this.dataStack
          .splice(-2)
          .map(number => +number)
  
        this.dataStack
          .push( (firstNum + secondNum).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'cmp': {
        this.commandsStack.push('0x0005')

        const [secondNum, firstNum] = this.dataStack
          .slice(-2)
          .map(number => +number)
        
        this.dataStack.push((firstNum - secondNum).toString())
        
        this.nextCommandNumber++
        break
      }
      case 'jlt': {
        this.commandsStack.push('0x0006')

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
      case 'stc': {
        this.commandsStack.push('0x0007')
        
        this.dataStack.push(this.counter.toString())

        this.counter = 0

        this.nextCommandNumber++
        break
      }
      case 'ldc': {
        this.commandsStack.push('0x0008')

        const [firstNum] = this.dataStack
          .splice(-1)
          .map(number => +number)

        this.counter = firstNum

        this.nextCommandNumber++
        break
      }
      case 'pop': {
        this.commandsStack.push('0x0009')

        this.dataStack.pop()

        this.nextCommandNumber++
        break
      }
      case 'jgt': {
        this.commandsStack.push('0x000A')

        const [firstNum] = this.dataStack
          .splice(-1)
          .map(number => +number)

        if (firstNum > 0) {
          this.nextCommandNumber = this.commands
            .findIndex(command => command.indexOf(data[0] + ':') + 1)

          break
        }

        this.nextCommandNumber++
        break
      }
      case 'swp': {
        this.commandsStack.push('0x000B')

        const [firstNum, secondNum] = this.dataStack
          .splice(-2)
          .map(number => +number)

        this.dataStack.push(secondNum.toString())
        this.dataStack.push(firstNum.toString())

        this.nextCommandNumber++
        break
      }
      case 'dup': {
        this.commandsStack.push('0x000C')

        const [firstNum] = this.dataStack
          .slice(-1)
          .map(number => +number)

        this.dataStack.push(firstNum.toString())

        this.nextCommandNumber++
        break
      }
      case 'rol': {
        this.commandsStack.push('0x000D')

        const [firstNum, secondNum, thirdNum] = this.dataStack
          .splice(-3)
          .map(number => +number)

        this.dataStack.push(secondNum.toString())
        this.dataStack.push(thirdNum.toString())        
        this.dataStack.push(firstNum.toString())
        
        this.nextCommandNumber++
        break
      }
      case 'ror': {
        this.commandsStack.push('0x000E')

        const [firstNum, secondNum, thirdNum] = this.dataStack
          .splice(-3)
          .map(number => +number)

        this.dataStack.push(thirdNum.toString())
        this.dataStack.push(firstNum.toString())
        this.dataStack.push(secondNum.toString())

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