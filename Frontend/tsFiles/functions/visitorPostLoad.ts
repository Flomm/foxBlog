import Postable from '../Interfaces/IPostable';
import visitorInitiatePost from './visitorInitiatePost';

const postedMain: HTMLDivElement = document.querySelector('.posted-body');

export default function visitorPostLoad(orderBy: string): void {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status !== 200) {
      alert(`${JSON.parse(xhr.response).message}`);
    } else {
      const parsed: Postable[] = JSON.parse(xhr.response);
      postedMain.innerHTML = '';
      for (let p of parsed) {
        visitorInitiatePost(p, postedMain);
      }
    }
  };
  xhr.open('GET', '/api/posts/visitor');
  xhr.setRequestHeader('sort', orderBy.split(' ')[0]);
  const order: boolean = orderBy.split(' ')[1] !== '0' ? true : false;
  xhr.setRequestHeader('order', JSON.stringify(order));
  xhr.send();
}
