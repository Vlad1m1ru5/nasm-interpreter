export default class Program {
  
  private readonly commands: string[]
  private nextCommandNumber: number
  private readonly dataStack: string[]

  constructor(commands: string[]) {
    this.dataStack = []
    this.nextCommandNumber = 0
    this.commands = commands
      .map(command => command.trim())
      .map(command => command.slice(0, command.indexOf('#')))
      .filter(isCommand => isCommand)
  }

  next(): void {
    const executingCommand = this.commands[this.nextCommandNumber]
    const [instruction, ...data] = this.getCommandKeyWords(executingCommand)
    const [left, right] = this.dataStack
      .slice(-2)
      .map(number => +number)

    switch (instruction) {
      case 'push':
        this.dataStack.push(data[0])
        break
      case 'subtract':
        this.dataStack.splice(-2)
        this.dataStack.push((left - right).toString())
        break
      case 'multiply':
        this.dataStack.splice(-2)
        this.dataStack.push((left * right).toString())
        break
      case 'add':
        this.dataStack.splice(-2)
        this.dataStack.push((left + right).toString())
        break
      default:
        break
    }

    this.nextCommandNumber++
  }

  hasNext(): boolean {
    return !!this.commands.length
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