import { Cancion } from './cancion';


export class MaxHeap {
  heap: Cancion[];

  constructor() {
    this.heap = [];
  }

  push(value: Cancion): void {
    this.heap.push(value);
    this.percolateUp();
  }

  pop(): Cancion | undefined {
    if (this.heap.length === 0) return undefined;
    const n = this.heap.length;
    this.swap(0, n - 1);
    const max = this.heap.pop();
    this.percolateDown(0);
    return max;
  }

  percolateDown(index: number): void {
    let curr = index;
    while (2 * curr + 1 < this.heap.length) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      const maxChild =
        right < this.heap.length && this.heap[right].reproducciones > this.heap[left].reproducciones
          ? right
          : left;
      if (this.heap[maxChild].reproducciones > this.heap[curr].reproducciones) {
        this.swap(curr, maxChild);
        curr = maxChild;
      } else {
        break;
      }
    }
  }

  percolateUp(): void {
    let curr = this.heap.length - 1;
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      if (this.heap[curr].reproducciones > this.heap[parent].reproducciones) {
        this.swap(curr, parent);
        curr = parent;
      } else {
        break;
      }
    }
  }

  swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  size(): number {
    return this.heap.length;
  }
}
