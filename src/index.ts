import 'assets/index.scss';

import 'controllers/Controls';
import 'controllers/Main';

window.onload = () => {
  document.body.classList.remove('preload');
};

const hamburger = document.querySelector('#menu_checkbox') as HTMLElement;
const menu = document.querySelector('.mobile') as HTMLElement;

hamburger?.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  menu?.classList.toggle('opened');
});

menu?.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
});
