import Postable from '../Interfaces/IPostable';
import initiatePost from './initiatePost';
import createSuccessDiv from './createSuccessDiv';

const main: HTMLDivElement = document.querySelector('.main');

export default function loadPosts(endP: string): void {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status !== 200) {
      createSuccessDiv(`${JSON.parse(xhr.response).message}`);
    } else {
      const postedMain: HTMLDivElement = document.createElement('div');
      postedMain.classList.add('posted-main');
      const h2: HTMLHeadingElement = document.createElement('h2');
      if (endP === 'myPosts') {
        h2.textContent = 'My posts';
      } else {
        h2.textContent = 'Posts';
      }
      postedMain.appendChild(h2);
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
