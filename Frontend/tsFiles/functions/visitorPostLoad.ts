import Postable from '../Interfaces/IPostable';
import GeneralPost from '../Classes/GeneralPost';

function initialPost(postObject: Postable): void {
  const newPost: GeneralPost = new GeneralPost(postObject);
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}

export default function visitorPostLoad(): void {
  const newReq: XMLHttpRequest = new XMLHttpRequest();
  newReq.onreadystatechange = () => {
    if (newReq.readyState === 4 && newReq.status === 200) {
      const posts = newReq.response;
      const parsed: Postable[] = JSON.parse(posts);
      for (let p of parsed) {
        initialPost(p);
      }
    }
  };
  newReq.open('GET', '/api/posts');
  newReq.send();
}
