import Postable from '../Interfaces/IPostable';
import GeneralPost from '../Classes/GeneralPost';

export default function visitorInitiatePost(postObject: Postable, postedMain: HTMLDivElement): void {
  const newPost: GeneralPost = new GeneralPost(postObject);
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}
