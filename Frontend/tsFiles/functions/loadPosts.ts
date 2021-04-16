import Postable from '../Interfaces/IPostable';
import initiatePost from './initiatePost';
import createSuccessDiv from './createSuccessDiv';
import { options } from '../other/optionsString';

const main: HTMLDivElement = document.querySelector('.main');

export default function loadPosts(endP: string): void {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status !== 200) {
      createSuccessDiv(`${JSON.parse(xhr.response).message}`);
    } else {
      const postedMain: HTMLDivElement = document.createElement('div');
      postedMain.classList.add('posted-main');
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
      const submitBtn: HTMLInputElement = document.createElement('input');
      submitBtn.setAttribute('type', 'submit');
      submitBtn.value = 'Sort';
      selectForm.appendChild(submitBtn);
      posterHead.appendChild(selectForm);
      postedMain.appendChild(posterHead);
      main.appendChild(postedMain);
      const parsedPost: Postable[] = JSON.parse(xhr.response);
      for (let p of parsedPost) {
        initiatePost(p, endP);
      }
    }
  };
  xhr.open('GET', `/api/posts/${endP}`);
  xhr.setRequestHeader('user', window.localStorage.getItem('user'));
  xhr.send();
}
