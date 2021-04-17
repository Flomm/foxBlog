import Postable from '../Interfaces/IPostable';
import PersonalPost from '../Classes/PersonalPost';
import VotablePost from '../Classes/VotablePost';

export default function initiatePost(postObject: Postable, endP: string, postBody: HTMLDivElement): void {
  const mainChilds: NodeList = document.querySelectorAll('.posted-slot');
  if (endP === 'myPosts') {
    const newPost: PersonalPost = new PersonalPost(postObject);
    postBody.insertBefore(newPost.makePost(), mainChilds[0]);
  } else {
    const newPost: VotablePost = new VotablePost(postObject);
    postBody.insertBefore(newPost.makePost(), mainChilds[0]);
  }
}
