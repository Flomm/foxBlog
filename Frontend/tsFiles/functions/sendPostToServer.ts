import Sendable from '../Interfaces/ISendable';
import Postable from '../Interfaces/IPostable';
import frontEndInsert from './frontendInsert';

export default function sendPostToServer(postObject: Sendable): void {
  const postReq: XMLHttpRequest = new XMLHttpRequest();
  postReq.open('POST', '/api/addpost', true);
  postReq.setRequestHeader('Content-Type', 'application/json');
  postReq.send(JSON.stringify(postObject));
  postReq.onload = () => {
    if (postReq.status !== 202) {
      alert('There was an problem, please try again.');
    }
    const newPost: Postable = JSON.parse(postReq.response);
    newPost.author = window.localStorage.getItem('user');
    frontEndInsert(newPost);
  };
}
