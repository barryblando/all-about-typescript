import { Sorter } from "./Sorter";

export class NumbersCollection extends Sorter {

  constructor(public data: number[]) {
    super()
    // bind compare & swap 'cause of destructuring assignment operation and calling it w/o implicit binding which caused lost of implicitly bound context
    this.compare = this.compare.bind(this)
    this.swap = this.swap.bind(this)
  }

  get length(): number {
    return this.data.length
  }

  // Abstract out compare and swap methods
  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex]
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftHand = this.data[leftIndex]
    this.data[leftIndex] = this.data[rightIndex]
    this.data[rightIndex] = leftHand
  }
}