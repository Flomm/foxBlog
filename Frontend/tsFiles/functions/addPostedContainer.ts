import { options } from '../other/optionsString';
import loadPosts from './loadPosts';

export default function addPostedContainer(endP: string, main: HTMLDivElement): void {
  const postedMain: HTMLDivElement = document.createElement('div');
  postedMain.classList.add('posted-main');
  const postBody: HTMLDivElement = document.createElement('div');
  postBody.classList.add('posted-body');
  const posterHead: HTMLDivElement = document.createElement('div');
  posterHead.classList.add('post-head');
  const h2: HTMLHeadingElement = document.createElement('h2');
  if (endP === 'myPosts') {
    h2.textContent = 'My posts';
  } else {
    h2.textContent = 'Posts';
  }
  posterHead.appendChild(h2);
  const selectForm: HTMLFormElement = document.createElement('form');
  selectForm.classList.add('sort-form');
  const selectLabel: HTMLLabelElement = document.createElement('label');
  selectLabel.setAttribute('for', 'sort-select');
  selectLabel.textContent = 'Sort by:';
  selectForm.appendChild(selectLabel);
  const selector: HTMLSelectElement = document.createElement('select');
  selector.setAttribute('name', 'select');
  selector.setAttribute('id', 'sort-select');
  selector.innerHTML = options;
  selectForm.appendChild(selector);
  posterHead.appendChild(selectForm);
  postedMain.appendChild(posterHead);
  postedMain.appendChild(postBody);
  //Listeners
  selectForm.addEventListener('submit', (ev: Event) => {
    const selector: HTMLSelectElement = document.querySelector('select');
    ev.preventDefault();
    console.log(`form ${selector.value}`);
    loadPosts(endP, selector.value);
  });
  selector.addEventListener('change', () => {
    console.log(selector.value);
    selector.blur();
    selectForm.requestSubmit();
  });
  main.appendChild(postedMain);
}
