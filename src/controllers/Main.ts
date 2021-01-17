import { generateRandomNumber } from 'utils/helpers';

import { Canvas, ICanvas } from 'controllers/Canvas';
import {
  SortQueue,
  ISortQueue,
  QueueElement,
  Algorithm,
} from 'controllers/SortQueue';
import { bubbleSort } from 'controllers/algorithms/bubbleSort';
import { selectionSort } from 'controllers/algorithms/selectionSort';
import { insertionSort } from 'controllers/algorithms/insertionSort';
import { mergeSort } from 'controllers/algorithms/mergeSort';

export enum SORT {
  BUBBLE = 'bubble',
  SELECTION = 'selection',
  INSERTION = 'insertion',
  MERGE = 'merge',
}

export enum ARRAY_TYPE {
  NORMAL = 'normal',
  ALMOST_SORTED = 'almost_sorted',
  FEW_UNIQUE = 'few_unique',
  REVERSED = 'reversed',
}

export interface IMain {
  activeSort: SORT;
  generateArray: () => void;
  setActiveSort: (type: SORT) => void;
  setActualQueueElement: (elm: QueueElement) => void;
  setArrayLength: (len: number) => void;
  setArrayType: (type: ARRAY_TYPE) => void;
  setNumbersRange: (max: number) => void;
  setTimeout: (timeout: number) => void;
  stepBackward: () => void;
  stepForward: () => void;
  togglePlayingState: () => void;
}

export class Main implements IMain {
  activeSort: SORT = SORT.BUBBLE;
  arrayType: ARRAY_TYPE = ARRAY_TYPE.NORMAL;

  private canvasRef: ICanvas;
  private sortQueueRef?: ISortQueue;

  private arr: number[] = [];
  private arrLength = 100;
  private min = 1;
  private max = 50;
  private timeout = 1;

  constructor() {
    this.canvasRef = new Canvas();
    this.generateArray();
  }

  private setArray = (arr: number[], first?: boolean): void => {
    this.arr = arr;
    this.canvasRef.setArray(arr, first);
  };

  setArrayLength = (len: number): void => {
    this.arrLength = len;
    this.generateArray();
  };

  setNumbersRange = (max: number): void => {
    this.max = max;
    this.generateArray();
  };

  setArrayType = (type: ARRAY_TYPE): void => {
    this.arrayType = type;
    this.generateArray();
  };

  // ************************* QUEUE ************************* //

  private sortQueueSetup = (): void => {
    const { activeSort, arr, sortQueueRef, timeout } = this;
    sortQueueRef?.stop();

    let algorithm: Algorithm;

    switch (activeSort) {
      case SORT.MERGE:
        algorithm = mergeSort;
        break;

      case SORT.BUBBLE:
        algorithm = bubbleSort;
        break;

      case SORT.SELECTION:
        algorithm = selectionSort;
        break;

      case SORT.INSERTION:
        algorithm = insertionSort;
        break;

      default:
        throw new Error('Main error');
    }

    this.setArray(arr);
    this.sortQueueRef = new SortQueue(this, arr, algorithm, timeout);
  };

  setActualQueueElement = (elm: QueueElement): void => {
    this.setArray(elm.arr);

    elm.swap?.forEach((idx) => {
      this.canvasRef.setSwapElement(idx);
    });

    elm.compare?.forEach((idx) => {
      this.canvasRef.setCompareElement(idx);
    });
  };

  // ************************* CONTROLS ************************* //

  setTimeout = (timeout: number): void => {
    this.timeout = timeout;
    this.sortQueueRef?.setTimeout(timeout);
  };

  setActiveSort = (type: SORT): void => {
    this.activeSort = type;
    this.sortQueueSetup();
  };

  togglePlayingState = (): void => {
    if (this?.sortQueueRef?.running) {
      this.sortQueueRef?.stop();
    } else {
      this.sortQueueRef?.start();
    }
  };

  stepForward = (): void => {
    this.sortQueueRef?.stepForward();
  };

  stepBackward = (): void => {
    this.sortQueueRef?.stepBackward();
  };

  generateArray = (): void => {
    const { arrLength, max, min, setArray, sortQueueRef, arrayType } = this;
    sortQueueRef?.stop();

    let arr = Array(arrLength)
      .fill(null)
      .map(() => generateRandomNumber(min, max));

    switch (arrayType) {
      case ARRAY_TYPE.ALMOST_SORTED:
        arr.sort((a, b) => a - b + 1);
        break;

      case ARRAY_TYPE.FEW_UNIQUE:
        arr = arr.map((num) => (num % 4) + 1);
        break;

      case ARRAY_TYPE.REVERSED:
        arr.sort((a, b) => b - a);
        break;
    }

    setArray(arr, true);
    this.sortQueueSetup();
  };
}
