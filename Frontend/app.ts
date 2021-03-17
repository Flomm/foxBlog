import postBlog from './tsFiles/postFunction';
import initialLoad from './tsFiles/intitialLoad';

const inputForm: HTMLFormElement = document.querySelector('#post-form');
const inputFields: HTMLInputElement[] = Array.from(inputForm.querySelectorAll('input, textarea')) as HTMLInputElement[];

window.addEventListener('load', () => {
  initialLoad();
});

inputForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  postBlog(inputFields);
});
