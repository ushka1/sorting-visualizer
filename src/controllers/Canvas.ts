import { cssVar } from 'utils/helpers';

class Canvas {
  private arr: number[] = [];
  private gap = 10;
  private uWidth = 0;
  private uHeight = 0;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private color = cssVar('--c2');
  private colorActive = cssVar('--c3');

  setArray = (newArr: number[]) => {
    const { canvas, gap } = this;

    this.arr = newArr;
    this.uWidth = (canvas.width - gap * (newArr.length - 1)) / newArr.length;
    this.uHeight = canvas.height / [...newArr].sort((a, b) => b - a)[0];

    this.clear();
    this.renderArray();
  };

  setActiveElement = (idx: number) => {
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
      canvas.width = window.innerWidth * 0.8;
      canvas.height = window.innerHeight * 0.8;

      this.canvas = canvas;
      this.ctx = ctx;
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
}

export default new Canvas();
