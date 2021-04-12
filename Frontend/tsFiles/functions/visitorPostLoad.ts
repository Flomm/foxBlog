import Postable from '../Interfaces/IPostable';
import GeneralPost from '../Classes/GeneralPost';

function initialPost(postObject: Postable): void {
  const newPost: GeneralPost = new GeneralPost(postObject);
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}

export default function visitorPostLoad(): void {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status !== 200) {
      alert(`${JSON.parse(xhr.response).message}`);
    } else {
      const posts = xhr.response;
      const parsed: Postable[] = JSON.parse(posts);
      for (let p of parsed) {
        initialPost(p);
      }
    }
  };
  xhr.open('GET', '/api/posts/visitor');
  xhr.send();
}
