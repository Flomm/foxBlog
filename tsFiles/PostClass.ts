export class Post {
  //input
  private author: string;
  private title: string;
  private content: string;
  private date: string;
  //output
  private postSlot: HTMLDivElement;
  private postAuthor: HTMLDivElement;
  private postDate: HTMLDivElement;
  private postMisc: HTMLDivElement;
  private postTitle: HTMLDivElement;
  private postContent: HTMLDivElement;

  constructor(author: string, title: string, content: string, date: string) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.date = date;
  }

  createPostDivs(): void {
    this.postSlot = document.createElement("div");
    this.postAuthor = document.createElement("div");
    this.postDate = document.createElement("div");
    this.postMisc = document.createElement("div");
    this.postTitle = document.createElement("div");
    this.postContent = document.createElement("div");
  }

  assignClasses(): void {
    this.postTitle.classList.add("posted_title");
    this.postAuthor.classList.add("posted_author");
    this.postDate.classList.add("posted_date");
    this.postMisc.classList.add("posted_misc");
    this.postContent.classList.add("posted_content");
    this.postSlot.classList.add("posted_slot");
  }

  fillPost(): void {
    this.postAuthor.innerHTML = `Posted by: ${this.author}`;
    this.postDate.innerHTML = `On: ${this.date}`;
    this.postTitle.innerHTML = this.title;
    this.postContent.innerHTML = this.content;
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
