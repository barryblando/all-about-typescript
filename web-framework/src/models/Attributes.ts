export class Attributes<T> {
  constructor(private data: T) {}
  
  // The return type is going to be a lookup on type T for the given key
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  set(update: T): void {
    this.data = { ...this.data, ...update }
  }

  getAll(): T {
    return this.data
  }
}
