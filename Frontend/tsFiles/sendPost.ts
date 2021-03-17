import Postable from './Postable';

export default function sendPostToServer(postObject: Postable): void {
  const postReq: XMLHttpRequest = new XMLHttpRequest();
  postReq.open('POST', '/api/addpost', true);
  postReq.setRequestHeader('Content-Type', 'application/json');
  postReq.send(JSON.stringify(postObject));
  postReq.onload = () => {
    if (postReq.status !== 202) {
      alert('There was an problem, please try again.');
    }
  };
}
