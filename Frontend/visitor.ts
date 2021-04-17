import visitorPostLoad from './tsFiles/functions/visitorPostLoad';
const selector: HTMLSelectElement = document.querySelector('select');
const sortForm: HTMLFormElement = document.querySelector('.sort-form');

window.addEventListener('load', () => {
  visitorPostLoad('timestamp ASC');
});

sortForm.addEventListener('submit', (ev: Event) => {
  ev.preventDefault();
  visitorPostLoad(selector.value);
});

selector.addEventListener('change', () => {
  selector.blur();
  sortForm.requestSubmit();
});
