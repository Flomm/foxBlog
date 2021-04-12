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
        alert(`${JSON.parse(xhr.response).message}`);
      } else {
        const newPost: Postable = JSON.parse(xhr.response);
        this.postInput.score = newPost.score;
        this.postInput.vote = newPost.vote;
        this.likeBarP.textContent = `Score: ${this.postInput.score}`;
        this.toggleLikeStyles();
      }
    };
    xhr.open('PUT', `/api/posts/${this.postInput.id}/${voteType}`);
    xhr.setRequestHeader('user', window.localStorage.getItem('user'));
    xhr.send();
  }

  toggleLikeStyles() {
    const likeBtns: HTMLButtonElement[] = Array.from(this.likeBar.querySelectorAll('button'));
    const downIcon: HTMLElement = likeBtns[0].querySelector('icon');
    const upIcon: HTMLElement = likeBtns[1].querySelector('icon');
    if (this.postInput.vote === 0) {
      downIcon.classList.remove('down-vote');
      upIcon.classList.remove('up-vote');
    } else if (this.postInput.vote === 1) {
      downIcon.classList.remove('down-vote');
      upIcon.classList.add('up-vote');
    } else if (this.postInput.vote === -1) {
      downIcon.classList.add('down-vote');
      upIcon.classList.remove('up-vote');
    }
  }

  addVoteButtons() {
    const downVoteBtn: HTMLButtonElement = document.createElement('button');
    const upVoteBtn: HTMLButtonElement = document.createElement('button');
    const downIcon: HTMLElement = document.createElement('icon');
    downIcon.classList.add('fas');
    downIcon.classList.add('fa-thumbs-down');
    const upIcon: HTMLElement = document.createElement('icon');
    upIcon.classList.add('fas');
    upIcon.classList.add('fa-thumbs-up');
    downVoteBtn.appendChild(downIcon);
    upVoteBtn.appendChild(upIcon);
    downVoteBtn.addEventListener('click', () => {
      this.makeVote('downvote');
    });
    if (this.postInput.vote === -1) {
      downIcon.classList.add('down-vote');
    }
    upVoteBtn.addEventListener('click', () => {
      this.makeVote('upvote');
    });
    if (this.postInput.vote === 1) {
      upIcon.classList.add('up-vote');
    }
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
