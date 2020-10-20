interface Program {
  next(): void
  hasNext(): boolean
  data(): string[]
  instructions(): string[]
}

export default class ProgramImpl implements Program {
  
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
  }

  instructions(): string[] {
    return this.commands
      .map(command => command.slice(0, command.indexOf(' ')))
      .filter(isInstruction => isInstruction)
  }
}