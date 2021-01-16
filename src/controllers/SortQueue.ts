import { IMain } from 'controllers/Main';

export type QueueElement = { arr: number[]; active: number[] };
export type Algorithm = (arr: number[]) => QueueElement[];

export interface ISortQueue {
  start: () => void;
  stop: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  setTimeout: (timeout: number) => void;
  readonly running: boolean;
}

export class SortQueue implements ISortQueue {
  private mainRef: IMain;
  private timeout = 1;

  firstRun = true;
  running = false;
  private idx = 0;
  private queue: QueueElement[] = [];

  constructor(
    mainRef: IMain,
    arr: number[],
    algorithm: Algorithm,
    timeout?: number,
  ) {
    this.mainRef = mainRef;

    this.queue.push({ arr, active: [] });
    this.queue.push(...algorithm([...arr]));
    this.queue.push({ arr: this.queue[this.queue.length - 1].arr, active: [] });

    if (timeout) {
      this.timeout = timeout;
    }
  }

  setTimeout = (timeout: number): void => {
    this.timeout = timeout;
  };

  setIndex = (dir: 'inc' | 'dec'): void => {
    if (dir === 'inc' && this.idx < this.queue.length - 1) {
      this.idx++;
    }

    if (dir === 'dec' && this.idx > 0) {
      this.idx--;
    }

    this.mainRef.setActualQueueElement(this.queue[this.idx]);
  };

  stepForward = (): void => {
    if (this.running) return;

    this.setIndex('inc');
  };

  stepBackward = (): void => {
    if (this.running) return;

    this.setIndex('dec');
  };

  start = (): void => {
    if (!this.running) {
      this.running = true;
      this.next();
    }
  };

  stop = (): void => {
    this.running = false;
  };

  private next = (): void => {
    if (!this.running) return;

    if (this.idx < this.queue.length - 1) {
      this.setIndex('inc');

      setTimeout(() => {
        this.next();
      }, this.timeout);
    } else {
      this.running = false;
    }
  };
}
