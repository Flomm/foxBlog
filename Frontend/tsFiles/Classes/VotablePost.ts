import GeneralPost from './GeneralPost';
import Postable from '../Interfaces/IPostable';

export default class VotablePost extends GeneralPost {
  constructor(postObject: Postable) {
    super(postObject);
  }
  boundVote = this.makeVote.bind(this);

  makeVote(voteType: string) {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert('Something went wrong, please try again.');
      } else {
        const newPost: Postable = JSON.parse(xhr.response)[0];
        this.likeBarP.textContent = `Score: ${newPost.score}`;
      }
    };
    xhr.open('PUT', `/api/posts/${this.postInput.id}/${voteType}`);
    xhr.setRequestHeader('user', window.localStorage.getItem('user'));
    xhr.send();
  }

  addVoteButtons() {
    const downVoteBtn: HTMLButtonElement = document.createElement('button');
    const upVoteBtn: HTMLButtonElement = document.createElement('button');
    const downIcon: HTMLElement = document.createElement('icon');
    downIcon.classList.add('fas');
    downIcon.classList.add('fa-arrow-down');
    const upIcon: HTMLElement = document.createElement('icon');
    upIcon.classList.add('fas');
    upIcon.classList.add('fa-arrow-up');
    downVoteBtn.appendChild(downIcon);
    upVoteBtn.appendChild(upIcon);
    downVoteBtn.addEventListener('click', () => {
      this.makeVote('downvote');
    });
    upVoteBtn.addEventListener('click', () => {
      this.makeVote('upvote');
    });
    this.likeBar.insertBefore(downVoteBtn, this.likeBar.firstElementChild);
    this.likeBar.appendChild(upVoteBtn);
  }

  makePost(): HTMLDivElement {
    this.createPostDivs();
    this.assignClasses();
    this.fillPost();
    this.createStructure();
    this.addVoteButtons();
    return this.postSlot;
  }
}
