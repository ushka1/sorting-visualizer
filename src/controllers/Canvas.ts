import { cssVar } from 'utils/helpers';

export interface ICanvas {
  setArray: (arr: number[]) => void;
  setActiveElement: (idx: number) => void;
}

export class Canvas implements ICanvas {
  private arr: number[] = [];
  private gap = 2;
  private uWidth = 0;
  private uHeight = 0;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private color = cssVar('--c2');
  private colorActive = cssVar('--c3');

  setArray = (newArr: number[]): void => {
    this.arr = newArr;
    this.resizeHandler();
  };

  setActiveElement = (idx: number): void => {
    const { arr, colorActive, ctx, renderElement } = this;
    const num = arr[idx];

    if (num !== undefined) {
      ctx.fillStyle = colorActive;
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

  private resizeHandler = () => {
    const { canvas, gap, arr } = this;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    this.uWidth = (canvas.width - gap * (arr.length - 1)) / arr.length;
    this.uHeight = canvas.height / Math.max(...arr);

    this.clear();
    this.renderArray();
  };
}
