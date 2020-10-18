interface HarvardArchitectureComputer {
  next(): void
  hasNext(): boolean
  data(): string[]
  instructions(): string[]
}

export default class HarvardArchitectureComputerImpl implements HarvardArchitectureComputer {
  
  private readonly commands: string[]

  constructor(commands: string[]) {
    this.commands = commands
  }

  next(): void {
    throw new Error("Method not implemented.");
  }

  hasNext(): boolean {
    throw new Error("Method not implemented.");
  }

  data(): string[] {
    throw new Error("Method not implemented.");
  }

  instructions(): string[] {
    throw new Error("Method not implemented.");
  }
}