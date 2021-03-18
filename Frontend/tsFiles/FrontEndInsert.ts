import scrollToPost from './scrollToPost';
import Post from './PostClass';
import Postable from './Postable';

export default function frontEndInsert(newPostInput: Postable) {
  const newPost: Post = new Post(newPostInput);
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  const newPostSlot: HTMLDivElement = newPost.makePost();
  postedMain.insertBefore(newPostSlot, mainChilds[0]);
  scrollToPost(newPostSlot);
}
