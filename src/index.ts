import 'assets/index.scss';

import 'controllers/Controls';
import 'controllers/Main';

window.onload = () => {
  document.body.classList.remove('preload');
};

// let opened = false;
const hamburger = document.querySelector('#menu_checkbox') as HTMLElement;
const menu = document.querySelector('.mobile') as HTMLElement;

hamburger?.addEventListener('click', (e) => {
  e.stopImmediatePropagation();

  // opened = !opened;
  menu?.classList.toggle('opened');
});

menu?.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
});

// window.addEventListener('click', (e) => {
//   if (opened) {
//     hamburger?.click();
//   }
// });
