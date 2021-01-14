import { generateRandomNumber } from 'utils/helpers';
import Canvas from 'controllers/Canvas';

class Main {
  public array: number[] = [];
  public arrayLength = 20;
  private min = 1;
  private max = 20;

  constructor() {
    this.generateArray();
  }

  generateArray = () => {
    const { arrayLength, min, max } = this;

    const array = Array(arrayLength)
      .fill(null)
      .map(() => generateRandomNumber(min, max));

    this.array = array;
    Canvas.setArray(array);
  };
}

export default new Main();
