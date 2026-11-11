import { Producto } from './producto';

// MinHeap del profesor. El único cambio es que guarda productos,
// así que compara por popularity en vez de comparar números.
export class MinHeap {
  heap: Producto[];

  constructor(initial: Producto[] = []) {
    this.heap = [];
    if (initial.length > 0) {
      this.heap = [...initial];
      this.heapify();
    }
  }

  push(value: Producto): void {
    this.heap.push(value);
    this.percolateUp();
  }

  pop(): Producto | undefined {
    if (this.heap.length === 0) return undefined;
    const n = this.heap.length;
    this.swap(0, n - 1);
    const min = this.heap.pop();
    this.percolateDown(0);
    return min;
  }

  peek(): Producto | undefined {
    return this.heap[0];
  }

  heapify(): void {
    const start = Math.floor((this.heap.length - 2) / 2);
    for (let i = start; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  percolateDown(index: number): void {
    let curr = index;
    while (2 * curr + 1 < this.heap.length) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      const minChild =
        right < this.heap.length && this.heap[right].popularity < this.heap[left].popularity
          ? right
          : left;
      if (this.heap[minChild].popularity < this.heap[curr].popularity) {
        this.swap(curr, minChild);
        curr = minChild;
      } else {
        break;
      }
    }
  }

  percolateUp(): void {
    let curr = this.heap.length - 1;
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      if (this.heap[curr].popularity < this.heap[parent].popularity) {
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

  toArray(): Producto[] {
    return [...this.heap];
  }
}
