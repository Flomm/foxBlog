import GeneralPost from './GeneralPost';
import Postable from '../Interfaces/IPostable';
import loadPosts from '../functions/loadPosts';

export default class PersonalPost extends GeneralPost {
  constructor(postObject: Postable) {
    super(postObject);
  }
  boundShowBox = this.showConfirmBox.bind(this);

  showConfirmBox() {
    const wrapper: HTMLElement = document.querySelector('.main');
    const confirmBox: HTMLDivElement = document.createElement('div');
    confirmBox.classList.add('confirm-box');
    const newP1: HTMLParagraphElement = document.createElement('p');
    newP1.textContent = 'Are you sure you want to delete the post?';
    const newP2: HTMLParagraphElement = document.createElement('p');
    const yesBtn: HTMLButtonElement = document.createElement('button');
    yesBtn.classList.add('yes-btn');
    yesBtn.textContent = 'YES';
    const noBtn: HTMLButtonElement = document.createElement('button');
    yesBtn.classList.add('no-btn');
    noBtn.textContent = 'NO';
    newP2.appendChild(yesBtn);
    newP2.appendChild(noBtn);
    confirmBox.appendChild(newP1);
    confirmBox.appendChild(newP2);
    document.querySelector('body').insertBefore(confirmBox, wrapper);
    wrapper.classList.add('shady');
    yesBtn.addEventListener('click', () => {
      document.querySelector('body').removeChild(confirmBox);
      wrapper.classList.remove('shady');
      this.deletePost();
    });
    noBtn.addEventListener('click', () => {
      document.querySelector('body').removeChild(confirmBox);
      wrapper.classList.remove('shady');
    });
  }

  deletePost(): void {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert('Something went wrong, please try again.');
      } else {
        document.querySelector('.main').innerHTML = '';
        loadPosts('myPosts');
      }
    };
    xhr.open('DELETE', `/api/posts/${this.postInput.id}`);
    xhr.setRequestHeader('user', window.localStorage.getItem('user'));
    xhr.send();
  }

  addDelBtn(): void {
    const delBtn: HTMLButtonElement = document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.addEventListener('click', this.boundShowBox);
    const icon: HTMLElement = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-trash-alt');
    delBtn.appendChild(icon);
    delBtn.setAttribute('data-action', 'delete');
    const newSpan: HTMLSpanElement = document.createElement('span');
    newSpan.appendChild(delBtn);
    this.postTitle.appendChild(newSpan);
  }

  makePost(): HTMLDivElement {
    this.createPostDivs();
    this.assignClasses();
    this.fillPost();
    this.createStructure();
    this.addDelBtn();
    return this.postSlot;
  }
}
