import Postable from '../Interfaces/IPostable';
import initiatePost from './initiatePost';
import createSuccessDiv from './createSuccessDiv';

export default function loadPosts(endP: string, orderBy: string): void {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.onload = () => {
    const postBody: HTMLDivElement = document.querySelector('.posted-body');
    postBody.innerHTML = '';
    if (xhr.status !== 200) {
      return createSuccessDiv(`${JSON.parse(xhr.response).message}`, postBody);
    }
    const parsedPost: Postable[] = JSON.parse(xhr.response);
    for (let p of parsedPost) {
      initiatePost(p, endP, postBody);
    }
  };
  xhr.open('GET', `/api/posts/${endP}`);
  xhr.setRequestHeader('user', window.localStorage.getItem('user'));
  xhr.setRequestHeader('sort', orderBy.split(' ')[0]);
  const order: boolean = orderBy.split(' ')[1] !== '0' ? true : false;
  xhr.setRequestHeader('order', JSON.stringify(order));
  xhr.send();
}
