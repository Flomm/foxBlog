import scrollToPost from './scrollToPost';
import GeneralPost from './GeneralPostClass';
import Postable from './Postable';

export default function frontEndInsert(newPostInput: Postable) {
  const newPost: GeneralPost = new GeneralPost(newPostInput);
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  const newPostSlot: HTMLDivElement = newPost.makePost();
  postedMain.insertBefore(newPostSlot, mainChilds[0]);
  scrollToPost(newPostSlot);
}
