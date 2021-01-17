import { cssVar } from 'utils/helpers';

export interface ICanvas {
  setArray: (arr: number[], first?: boolean) => void;
  setSwapElement: (idx: number) => void;
  setCompareElement: (idx: number) => void;
}

export class Canvas implements ICanvas {
  private arr: number[] = [];
  private gap = 2;
  private uWidth = 0;
  private uHeight = 0;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private color = cssVar('--c2');
  private colorCompare = cssVar('--c3');
  private colorSwap = cssVar('--c4');

  setArray = (newArr: number[], first?: boolean): void => {
    this.arr = newArr;
    this.resizeHandler(first);
  };

  setSwapElement = (idx: number): void => {
    const { arr, colorSwap, ctx, renderElement } = this;
    const num = arr[idx];

    if (num !== undefined) {
      ctx.fillStyle = colorSwap;
      renderElement(num, idx);
    }
  };

  setCompareElement = (idx: number): void => {
    const { arr, colorCompare, ctx, renderElement } = this;
    const num = arr[idx];

    if (num !== undefined) {
      ctx.fillStyle = colorCompare;
      renderElement(num, idx);
    }
  };

  constructor() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      this.canvas = canvas;
      this.ctx = ctx;

      this.resizeHandler();
      window.addEventListener('resize', this.resizeHandler);
    } else {
      throw new Error('Canvas error');
    }
  }

  private renderArray = () => {
    const { arr, color, ctx, renderElement } = this;
    ctx.fillStyle = color;

    arr.forEach((num, idx) => renderElement(num, idx));
  };

  private renderElement = (num: number, idx: number) => {
    const { ctx, gap, uHeight, uWidth } = this;

    const x = idx * (gap + uWidth);
    const y = 0;
    const width = uWidth;
    const height = uHeight * num;

    ctx.fillRect(x, y, width, height);
  };

  private clear() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private resizeHandler = (first?: boolean | Event) => {
    const { canvas, gap, arr } = this;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    if (typeof first === 'boolean' && first) {
      this.uWidth = (canvas.width - gap * (arr.length - 1)) / arr.length;
      this.uHeight = canvas.height / Math.max(...arr);
    }

    this.clear();
    this.renderArray();
  };
}
