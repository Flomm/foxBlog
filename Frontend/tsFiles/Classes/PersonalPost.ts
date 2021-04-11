import GeneralPost from './GeneralPost';
import Postable from '../Interfaces/IPostable';
import loadPosts from '../functions/loadPosts';

export default class PersonalPost extends GeneralPost {
  constructor(postObject: Postable) {
    super(postObject);
    this.showConfirmBox = this.showConfirmBox.bind(this);
  }
  // boundShowBox = this.showConfirmBox.bind(this);

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
      this.xhrCall('DELETE', `/api/posts/${this.postInput.id}`);
    });
    noBtn.addEventListener('click', () => {
      document.querySelector('body').removeChild(confirmBox);
      wrapper.classList.remove('shady');
    });
  }

  showEditBox() {
    console.log('edit');
  }

  xhrCall(method: string, endpoint: string) {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert('Something went wrong, please try again.');
      } else {
        document.querySelector('.main').innerHTML = '';
        loadPosts('myPosts');
      }
    };
    xhr.open(method, endpoint);
    xhr.setRequestHeader('user', window.localStorage.getItem('user'));
    if (method === 'PUT') {
      const editedData: any = [];
      xhr.send(JSON.stringify(editedData));
    } else {
      xhr.send();
    }
  }

  // editPost(): void {}

  // deletePost(): void {
  //   const xhr: XMLHttpRequest = new XMLHttpRequest();
  //   xhr.onload = () => {
  //     if (xhr.status !== 200) {
  //       alert('Something went wrong, please try again.');
  //     } else {
  //       document.querySelector('.main').innerHTML = '';
  //       loadPosts('myPosts');
  //     }
  //   };
  //   xhr.open('DELETE', `/api/posts/${this.postInput.id}`);
  //   xhr.setRequestHeader('user', window.localStorage.getItem('user'));
  //   xhr.send();
  // }

  addBtn(type: string, callback, span: HTMLSpanElement): void {
    const newBtn: HTMLButtonElement = document.createElement('button');
    newBtn.classList.add(`${type}-btn`);
    newBtn.addEventListener('click', callback);
    const icon: HTMLElement = document.createElement('i');
    icon.classList.add('fas');
    if (type === 'delete') {
      icon.classList.add('fa-trash-alt');
    } else {
      icon.classList.add('fa-edit');
    }
    newBtn.appendChild(icon);
    newBtn.setAttribute('data-action', type);
    span.appendChild(newBtn);
  }

  makePost(): HTMLDivElement {
    this.createPostDivs();
    this.assignClasses();
    this.fillPost();
    this.createStructure();
    const newSpan: HTMLSpanElement = document.createElement('span');
    this.addBtn('edit', this.showEditBox, newSpan);
    this.addBtn('delete', this.showConfirmBox, newSpan);
    this.postTitle.appendChild(newSpan);
    return this.postSlot;
  }
}
