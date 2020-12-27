function postBlog() {  
    if ((document.getElementById("title_post") as HTMLInputElement).value === "" || (document.getElementById("content_post") as HTMLInputElement).value === "") {
        alert("Please add a title and a text as well! You cannot add an empty post!");
    }
    else {
        let xPost: HTMLDivElement = document.createElement("div");
        let xTitle: HTMLDivElement = document.createElement("div");
        let xContent: HTMLDivElement = document.createElement("div");

        xTitle.classList.add("posted_title");
        xContent.classList.add("posted_content");
        xPost.classList.add("posted_slot");

        let titleNew: string = (document.getElementById("title_post") as HTMLInputElement).value;
        let textNew: string = (document.getElementById("content_post") as HTMLInputElement).value;

        xTitle.innerHTML += titleNew;
        xContent.innerHTML += textNew;

        xPost.appendChild(xTitle);
        xPost.appendChild(xContent);

        document.getElementById("posted_main").appendChild(xPost);
    
        (document.getElementById("title_post") as HTMLInputElement).value = "";
        (document.getElementById("content_post") as HTMLInputElement).value = "";
    }
}
let subButton = document.getElementById("button_submit");
subButton.addEventListener("click", postBlog);

