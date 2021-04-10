import Postable from '../Interfaces/IPostable';
import initiatePost from './initiatePost';
import createSuccessDiv from './createSuccessDiv';

const main: HTMLDivElement = document.querySelector('.main');

export default function loadPosts(endP: string): void {
  const newReq: XMLHttpRequest = new XMLHttpRequest();
  newReq.onload = () => {
    if (newReq.status === 500) {
      createSuccessDiv('There was a problem with server. Please try again later.');
      return;
    }
    if (newReq.status === 400) {
      createSuccessDiv('Currently you have no posts.');
      return;
    }
    if (newReq.status === 200) {
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
      const posts = newReq.response;
      const parsed: Postable[] = JSON.parse(posts);
      for (let p of parsed) {
        initiatePost(p, endP);
      }
      return;
    }
    createSuccessDiv('There was a problem with the server. Please try again later.');
  };
  newReq.open('GET', `/api/posts/${endP}`);
  newReq.setRequestHeader('user', window.localStorage.getItem('user'));
  newReq.send();
}
