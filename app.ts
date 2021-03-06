import { postBlog } from "./tsFiles/postFunction";

const authorPost: HTMLInputElement = document.querySelector(
  ".author_post"
) as HTMLInputElement;
const titlePost: HTMLInputElement = document.querySelector(
  ".title_post"
) as HTMLInputElement;
const contentPost: HTMLInputElement = document.querySelector(
  ".content_post"
) as HTMLInputElement;

const inputArr: HTMLInputElement[] = [authorPost, titlePost, contentPost];

const subButton = document.querySelector(".button_submit");
subButton.addEventListener("click", () => {
  postBlog(inputArr);
});
