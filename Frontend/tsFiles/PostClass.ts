import Postable from './Postable';

export default class Post {
  //input
  private postInput: Postable;
  //output
  private postSlot: HTMLDivElement;
  private postAuthor: HTMLDivElement;
  private postDate: HTMLDivElement;
  private postMisc: HTMLDivElement;
  private postTitle: HTMLDivElement;
  private postContent: HTMLDivElement;

  constructor(postObject: Postable) {
    this.postInput = postObject;
  }

  createPostDivs(): void {
    this.postSlot = document.createElement('div');
    this.postAuthor = document.createElement('div');
    this.postDate = document.createElement('div');
    this.postMisc = document.createElement('div');
    this.postTitle = document.createElement('div');
    this.postContent = document.createElement('div');
  }

  assignClasses(): void {
    this.postTitle.classList.add('posted-title');
    this.postAuthor.classList.add('posted-author');
    this.postDate.classList.add('posted-date');
    this.postMisc.classList.add('posted-misc');
    this.postContent.classList.add('posted-content');
    this.postSlot.classList.add('posted-slot');
  }

  fillPost(): void {
    this.postAuthor.innerHTML = `Posted by: ${this.postInput.author}`;
    this.postDate.innerHTML = `On: ${this.postInput.date}`;
    this.postTitle.innerHTML = this.postInput.title;
    this.postContent.innerHTML = this.postInput.content;
  }

  creatStructure(): void {
    this.postSlot.appendChild(this.postTitle);
    this.postSlot.appendChild(this.postContent);
    this.postMisc.appendChild(this.postAuthor);
    this.postMisc.appendChild(this.postDate);
    this.postSlot.appendChild(this.postMisc);
  }

  makePost(): HTMLDivElement {
    this.createPostDivs();
    this.assignClasses();
    this.fillPost();
    this.creatStructure();
    return this.postSlot;
  }
}
