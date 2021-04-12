import Sendable from '../Interfaces/ISendable';
import Postable from '../Interfaces/IPostable';
import frontEndInsert from './frontendInsert';

export default function sendPostToServer(postObject: Sendable): void {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open('POST', '/api/addpost', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(postObject));
  xhr.onload = () => {
    if (xhr.status !== 200) {
      alert(`${JSON.parse(xhr.response).message}`);
    } else {
      const newPost: Postable = JSON.parse(xhr.response);
      newPost.author = window.localStorage.getItem('user');
      frontEndInsert(newPost);
    }
  };
}
