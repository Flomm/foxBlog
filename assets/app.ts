import { postBlog } from './tsFiles/postFunction';
import { Post } from './tsFiles/PostClass';

const authorPost: HTMLInputElement = document.querySelector('.author-post') as HTMLInputElement;
const titlePost: HTMLInputElement = document.querySelector('.title-post') as HTMLInputElement;
const contentPost: HTMLInputElement = document.querySelector('.content-post') as HTMLInputElement;

const inputArr: HTMLInputElement[] = [authorPost, titlePost, contentPost];

function initialPost(obj: Object): void {
  const valueList: string[] = Object.values(obj);
  const newPost: Post = new Post(valueList[0], valueList[1], valueList[2], valueList[3]);
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}

window.onload = () => {
  const newReq = new XMLHttpRequest();
  newReq.onreadystatechange = () => {
    if (newReq.readyState === 4 && newReq.status === 200) {
      const posts = newReq.response;
      const parsed: Object[] = JSON.parse(posts);
      console.log(parsed);
      for (let p of parsed) {
        initialPost(p);
      }
    }
  };
  newReq.open('GET', '/posts', true);
  newReq.send();
};

const subButton: HTMLButtonElement = document.querySelector('.button-submit') as HTMLButtonElement;
subButton.addEventListener('click', () => {
  postBlog(inputArr);
});
