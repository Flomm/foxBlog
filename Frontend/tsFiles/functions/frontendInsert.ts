import Postable from '../Interfaces/IPostable';
import VotablePost from '../Classes/VotablePost';
import scrollToPost from './scrollToPost';

export default function frontEndInsert(newPostInput: Postable) {
  const newPost: VotablePost = new VotablePost(newPostInput);
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  const newPostSlot: HTMLDivElement = newPost.makePost();
  postedMain.insertBefore(newPostSlot, mainChilds[0]);
  scrollToPost(newPostSlot);
}
