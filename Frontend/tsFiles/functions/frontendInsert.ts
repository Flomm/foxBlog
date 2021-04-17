import Postable from '../Interfaces/IPostable';
import VotablePost from '../Classes/VotablePost';
import scrollToPost from './scrollToPost';

export default function frontEndInsert(newPostInput: Postable) {
  const newPost: VotablePost = new VotablePost(newPostInput);
  const postedBody = document.querySelector('.posted-body');
  const mainChilds: NodeList = postedBody.querySelectorAll('.posted-slot');
  const newPostSlot: HTMLDivElement = newPost.makePost();
  postedBody.insertBefore(newPostSlot, mainChilds[0]);
  scrollToPost(newPostSlot);
}
