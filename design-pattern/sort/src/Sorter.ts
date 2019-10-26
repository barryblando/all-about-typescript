export abstract class Sorter {
  // abstract to mark certain methods to essentially implemented by child class
  abstract compare(leftIndex: number, rightIndex: number): boolean
  abstract swap(leftIndex: number, rightIndex: number): void
  abstract length: number

  sort(): void {
    const { length, compare, swap } = this

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        // [10, 3, -5, 0]
        // type guard to restore access to specific types properties associated that's been restricted by union type
        if (compare(j, j + 1)) {
          swap(j, j + 1)
        }
      }
    }
  }
}

