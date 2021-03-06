"use strict";
exports.__esModule = true;
exports.Post = void 0;
var Post = /** @class */ (function () {
    function Post(author, title, content, date) {
        this.author = author;
        this.title = title;
        this.content = content;
        this.date = date;
    }
    Post.prototype.createPostDivs = function () {
        this.postSlot = document.createElement("div");
        this.postAuthor = document.createElement("div");
        this.postDate = document.createElement("div");
        this.postMisc = document.createElement("div");
        this.postTitle = document.createElement("div");
        this.postContent = document.createElement("div");
    };
    Post.prototype.assignClasses = function () {
        this.postTitle.classList.add("posted_title");
        this.postAuthor.classList.add("posted_author");
        this.postDate.classList.add("posted_date");
        this.postMisc.classList.add("posted_misc");
        this.postContent.classList.add("posted_content");
        this.postSlot.classList.add("posted_slot");
    };
    Post.prototype.fillPost = function () {
        this.postAuthor.innerHTML = "Posted by: " + this.author;
        this.postDate.innerHTML = "On: " + this.date;
        this.postTitle.innerHTML = this.title;
        this.postContent.innerHTML = this.content;
    };
    Post.prototype.creatStructure = function () {
        this.postSlot.appendChild(this.postTitle);
        this.postSlot.appendChild(this.postContent);
        this.postMisc.appendChild(this.postAuthor);
        this.postMisc.appendChild(this.postDate);
        this.postSlot.appendChild(this.postMisc);
    };
    Post.prototype.makePost = function () {
        this.createPostDivs();
        this.assignClasses();
        this.fillPost();
        this.creatStructure();
        return this.postSlot;
    };
    return Post;
}());
exports.Post = Post;
