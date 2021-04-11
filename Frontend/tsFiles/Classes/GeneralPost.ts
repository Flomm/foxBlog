import Postable from '../Interfaces/IPostable';

export default class GeneralPost {
  //input
  protected postInput: Postable;
  //output
  protected postSlot: HTMLDivElement;
  protected postAuthor: HTMLDivElement;
  protected postDate: HTMLDivElement;
  protected postMisc: HTMLDivElement;
  protected postTitle: HTMLDivElement;
  protected titleText: HTMLSpanElement;
  protected postContent: HTMLDivElement;
  protected likeBar: HTMLDivElement;
  protected likeBarP: HTMLParagraphElement;

  constructor(postObject: Postable) {
    this.postInput = postObject;
  }

  createPostDivs(): void {
    this.postSlot = document.createElement('div');
    this.postAuthor = document.createElement('div');
    this.postDate = document.createElement('div');
    this.postMisc = document.createElement('div');
    this.postTitle = document.createElement('div');
    this.titleText = document.createElement('span');
    this.postContent = document.createElement('div');
    this.likeBar = document.createElement('div');
    this.likeBarP = document.createElement('p');
  }

  assignClasses(): void {
    this.postTitle.classList.add('posted-title');
    this.postAuthor.classList.add('posted-author');
    this.postDate.classList.add('posted-date');
    this.postMisc.classList.add('posted-misc');
    this.postContent.classList.add('posted-content');
    this.postSlot.classList.add('posted-slot');
    this.likeBar.classList.add('likebar');
  }

  fillPost(): void {
    this.postAuthor.textContent = `Posted by: ${this.postInput.author}`;
    this.postDate.textContent = `On: ${new Date(this.postInput.timestamp * 1000).toLocaleString().split(',')[0]}`;
    this.titleText.textContent = this.postInput.title;
    this.postContent.textContent = this.postInput.content;
    this.likeBarP.textContent = `Score: ${this.postInput.score}`;
  }

  createStructure(): void {
    this.postTitle.appendChild(this.titleText);
    this.postSlot.appendChild(this.postTitle);
    this.postSlot.appendChild(this.postContent);
    this.postMisc.appendChild(this.postAuthor);
    this.postMisc.appendChild(this.postDate);
    this.postSlot.appendChild(this.postMisc);
    this.likeBar.appendChild(this.likeBarP);
    this.postSlot.appendChild(this.likeBar);
  }

  makePost(): HTMLDivElement {
    this.createPostDivs();
    this.assignClasses();
    this.fillPost();
    this.createStructure();
    return this.postSlot;
  }
}
