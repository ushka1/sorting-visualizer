/* eslint-disable @typescript-eslint/no-explicit-any */
import { Main, IMain, SORT } from 'controllers/Main';

class Controls {
  mainRef: IMain;

  constructor() {
    this.mainRef = new Main();
    this.setup();
  }

  setActiveClass = () => {
    const { buttons } = this;

    buttons.forEach(({ id, ref }) => {
      ref?.forEach((ref) => {
        if (id === this.mainRef.activeSort) {
          ref?.classList.add('active');
        } else {
          ref?.classList.remove('active');
        }
      });
    });
  };

  setActiveSortHandler = (type: SORT) => {
    this.mainRef.setActiveSort(type);
    this.setActiveClass();
  };

  togglePlayingStateHandler = () => {
    this.mainRef.togglePlayingState();
  };

  generateHandler = () => {
    this.mainRef.generateArray();
  };

  stepForwardHandler = () => {
    this.mainRef.stepForward();
  };

  stepBackwardHandler = () => {
    this.mainRef.stepBackward();
  };

  setArrayLengthHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const val = +target?.value;

    this.mainRef.setArrayLength(val);
  };

  setNumbersRangeHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const val = +target?.value;

    this.mainRef.setNumbersRange(val);
  };

  setTimeoutHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const val = 500 - +target?.value;

    this.mainRef.setTimeout(val);
  };

  buttons: {
    id: string;
    ref?: (HTMLButtonElement | HTMLInputElement)[];
    handler?: any;
  }[] = [
    {
      id: 'merge',
      handler: this.setActiveSortHandler.bind(null, SORT.MERGE),
    },
    {
      id: 'bubble',
      handler: this.setActiveSortHandler.bind(null, SORT.BUBBLE),
    },
    {
      id: 'selection',
      handler: this.setActiveSortHandler.bind(null, SORT.SELECTION),
    },
    {
      id: 'insertion',
      handler: this.setActiveSortHandler.bind(null, SORT.INSERTION),
    },
    {
      id: 'generate',
      handler: this.generateHandler,
    },
    {
      id: 'play',
      handler: this.togglePlayingStateHandler,
    },
    {
      id: 'forward',
      handler: this.stepForwardHandler,
    },
    {
      id: 'backward',
      handler: this.stepBackwardHandler,
    },
    {
      id: 'length',
      handler: this.setArrayLengthHandler,
    },
    {
      id: 'range',
      handler: this.setNumbersRangeHandler,
    },
    {
      id: 'timeout',
      handler: this.setTimeoutHandler,
    },
  ];

  setup = () => {
    this.buttons = this.buttons.map((elm) => {
      const ref = [...document.querySelectorAll(`#${elm.id}`)] as (
        | HTMLButtonElement
        | HTMLInputElement
      )[];

      if (ref) {
        return { ...elm, ref };
      } else {
        return elm;
      }
    });

    this.buttons.forEach(({ handler, ref }) => {
      ref?.forEach((ref) => {
        if (ref instanceof HTMLButtonElement) {
          ref.addEventListener('click', handler);
        } else if (ref instanceof HTMLInputElement) {
          ref.addEventListener('input', handler);
        }
      });
    });

    this.setActiveClass();
  };
}

export const controls = new Controls();
