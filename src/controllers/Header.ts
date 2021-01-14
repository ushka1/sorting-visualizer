import Main from 'controllers/Main';

class Header {
  constructor() {
    this.setControls();
  }

  generateHandler = () => {
    Main.generateArray();
  };

  setControls = () => {
    const { generateHandler } = this;

    const bubble = document.querySelector('#bubble');

    const generate = document.querySelector('#generate');
    generate?.addEventListener('click', generateHandler);
  };
}

export const header = new Header();
