import { postBlog } from "./tsFiles/postFunction";

const authorPost: HTMLInputElement = document.querySelector(
  ".author-post"
) as HTMLInputElement;
const titlePost: HTMLInputElement = document.querySelector(
  ".title-post"
) as HTMLInputElement;
const contentPost: HTMLInputElement = document.querySelector(
  ".content-post"
) as HTMLInputElement;

const inputArr: HTMLInputElement[] = [authorPost, titlePost, contentPost];

const subButton = document.querySelector(".button-submit");
subButton.addEventListener("click", () => {
  postBlog(inputArr);
});
