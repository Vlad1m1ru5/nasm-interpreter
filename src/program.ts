interface IProgram {
  next(): void
  hasNext(): boolean
  data(): string[]
  instructions(): string[]
}

export default class Program implements IProgram {
  
  private readonly commands: string[]

  constructor(commands: string[]) {
    this.commands = commands
      .map(command => command.trim())
      .map(command => command.slice(0, command.indexOf('#')))
      .filter(isCommand => isCommand)
  }

  next(): void {
    this.commands.pop()
  }

  hasNext(): boolean {
    return !!this.commands.length
  }

  data(): string[] {
    return this.commands
      .map(command => {
        const commandArguments = command.match(/(?<=\s)\S+/)
      
        return commandArguments !== null ? 
          commandArguments :
          []
      })
      .filter(commandArguments => commandArguments.length)
      .flat()
  }

  instructions(): string[] {
    return this.commands
      .map(command => command.slice(0, command.indexOf(' ')))
      .filter(isInstruction => isInstruction)
  }
}