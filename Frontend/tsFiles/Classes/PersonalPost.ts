import GeneralPost from './GeneralPost';
import Postable from '../Interfaces/IPostable';
import IUpdateData from '../Interfaces/IUpdateData';
import formIsValid from '../functions/formIsValid';
import setAttributes from '../functions/setAttributes';
import { titleAttr, contentAttr } from '../other/attributeObjects';

export default class PersonalPost extends GeneralPost {
  constructor(postObject: Postable) {
    super(postObject);
    this.showConfirmBox = this.showConfirmBox.bind(this);
    this.showEditBox = this.showEditBox.bind(this);
    this.xhrCall = this.xhrCall.bind(this);
  }

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
    yesBtn.addEventListener('click', () => {
      document.querySelector('body').removeChild(confirmBox);
      wrapper.classList.remove('shady');
      this.xhrCall('DELETE', `/api/posts/${this.postInput.id}`);
    });
    noBtn.addEventListener('click', () => {
      document.querySelector('body').removeChild(confirmBox);
      wrapper.classList.remove('shady');
    });
    document.querySelector('body').insertBefore(confirmBox, wrapper);
    wrapper.classList.add('shady');
  }

  showEditBox() {
    const wrapper: HTMLElement = document.querySelector('.main');
    const editBox: HTMLDivElement = document.createElement('div');
    editBox.classList.add('edit-box');
    const submitMain: HTMLDivElement = document.createElement('div');
    submitMain.classList.add('submit-main');
    const titleSpan: HTMLSpanElement = document.createElement('span');
    titleSpan.textContent = 'Edit post!';
    submitMain.appendChild(titleSpan);
    const editForm: HTMLFormElement = document.createElement('form');
    editForm.setAttribute('id', 'post-form');
    //Input 1
    const labelSlot1: HTMLDivElement = document.createElement('div');
    labelSlot1.classList.add('label-slot');
    labelSlot1.setAttribute('err-text', ' Please add a title');
    const titleLabel: HTMLLabelElement = document.createElement('label');
    titleLabel.setAttribute('for', 'title-post');
    titleLabel.textContent = 'New title';
    labelSlot1.appendChild(titleLabel);
    const titleInpHolder: HTMLDivElement = document.createElement('div');
    titleInpHolder.classList.add('text-area');
    const titleInput: HTMLInputElement = document.createElement('input');
    setAttributes(titleInput, titleAttr);
    titleInput.value = this.postInput.title;
    titleInpHolder.appendChild(titleInput);
    //Input2
    const labelSlot2: HTMLDivElement = document.createElement('div');
    labelSlot2.classList.add('label-slot');
    labelSlot2.setAttribute('err-text', ' Please add content');
    const contentLabel: HTMLLabelElement = document.createElement('label');
    contentLabel.setAttribute('for', 'content-post');
    contentLabel.textContent = 'New content';
    labelSlot2.appendChild(contentLabel);
    const contentInpHolder: HTMLDivElement = document.createElement('div');
    contentInpHolder.classList.add('text-area');
    const contentInput: HTMLTextAreaElement = document.createElement('textarea');
    setAttributes(contentInput, contentAttr);
    contentInput.value = this.postInput.content;
    contentInpHolder.appendChild(contentInput);
    editForm.appendChild(labelSlot1);
    editForm.appendChild(titleInpHolder);
    editForm.appendChild(labelSlot2);
    editForm.appendChild(contentInpHolder);
    const submitBtn: HTMLInputElement = document.createElement('input');
    submitBtn.classList.add('button-submit');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.value = 'Submit fox';
    editForm.appendChild(submitBtn);
    editForm.addEventListener('submit', (ev: Event) => {
      const inputFields: HTMLInputElement[] = Array.from(
        editForm.querySelectorAll('input[type="text"], textarea')
      ) as HTMLInputElement[];
      ev.preventDefault();
      if (formIsValid(inputFields)) {
        this.xhrCall('PUT', `/api/posts/${this.postInput.id}`);
        document.querySelector('body').removeChild(editBox);
        wrapper.classList.remove('shady');
      }
    });
    const cancelBtn: HTMLButtonElement = document.createElement('button');
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.innerText = 'Cancel';
    cancelBtn.addEventListener('click', () => {
      document.querySelector('body').removeChild(editBox);
      wrapper.classList.remove('shady');
    });
    editForm.appendChild(cancelBtn);
    editBox.appendChild(editForm);
    document.querySelector('body').insertBefore(editBox, wrapper);
    wrapper.classList.add('shady');
  }

  xhrCall(method: string, endpoint: string) {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert('Something went wrong, please try again.');
      } else {
        if (method === 'DELETE') {
          const postedMain: HTMLDivElement = document.querySelector('.posted-main');
          postedMain.removeChild(this.postSlot);
        } else {
          const response: IUpdateData = JSON.parse(xhr.response);
          this.postInput.title = response.title;
          this.titleText.textContent = this.postInput.title;
          this.postInput.content = response.content;
          this.postContent.textContent = this.postInput.content;
        }
      }
    };
    xhr.open(method, endpoint);
    xhr.setRequestHeader('user', window.localStorage.getItem('user'));
    if (method === 'PUT') {
      const editForm: HTMLFormElement = document.querySelector('form');
      const inputFields: HTMLInputElement[] = Array.from(
        editForm.querySelectorAll('input[type="text"], textarea')
      ) as HTMLInputElement[];
      const editedData: IUpdateData = {
        title: inputFields[0].value,
        content: inputFields[1].value,
      };
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(editedData));
    } else {
      xhr.send();
    }
  }

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
