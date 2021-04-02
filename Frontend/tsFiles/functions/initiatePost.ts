import Postable from '../Interfaces/IPostable';
import PersonalPost from '../Classes/PersonalPost';
import VotablePost from '../Classes/VotablePost';

export default function initiatePost(postObject: Postable, endP: string): void {
  const postedMain = document.querySelector('.posted-main');
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  if (endP === 'myPosts') {
    const newPost: PersonalPost = new PersonalPost(postObject);
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
  } else {
    const newPost: VotablePost = new VotablePost(postObject);
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
  }
}
