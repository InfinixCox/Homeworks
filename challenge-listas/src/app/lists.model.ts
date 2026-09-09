// Lista Simplemente Enlazada
export interface Song {
  title: string;
  artist: string;
  duration: string;
}

export class SongNode {
  value: Song;
  next: SongNode | null;

  constructor(value: Song) {
    this.value = value;
    this.next = null;
  }
}

export class SimpleLinkedList {
  head: SongNode | null = null;
  tail: SongNode | null = null;
  length: number = 0;

  append(song: Song): void {
    const newNode = new SongNode(song);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    this.length++;
  }
}


// Lista Doblemente Enlazada
export interface BrowserPage {
  url: string;
  title: string;
  visitedTime: string;
}

export class BrowserNode {
  value: BrowserPage;
  next: BrowserNode | null = null;
  prev: BrowserNode | null = null;

  constructor(value: BrowserPage) {
    this.value = value;
  }
}

export class DoublyLinkedList {
  head: BrowserNode | null = null;
  tail: BrowserNode | null = null;
  length: number = 0;

  append(page: BrowserPage): void {
    const newNode = new BrowserNode(page);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
      }
      this.tail = newNode;
    }
    this.length++;
  }
}