"use strict";
exports.__esModule = true;
var Post = /** @class */ (function () {
    function Post(postObject) {
        this.postInput = postObject;
    }
    Post.prototype.createPostDivs = function () {
        this.postSlot = document.createElement('div');
        this.postAuthor = document.createElement('div');
        this.postDate = document.createElement('div');
        this.postMisc = document.createElement('div');
        this.postTitle = document.createElement('div');
        this.postContent = document.createElement('div');
    };
    Post.prototype.assignClasses = function () {
        this.postTitle.classList.add('posted-title');
        this.postAuthor.classList.add('posted-author');
        this.postDate.classList.add('posted-date');
        this.postMisc.classList.add('posted-misc');
        this.postContent.classList.add('posted-content');
        this.postSlot.classList.add('posted-slot');
    };
    Post.prototype.fillPost = function () {
        this.postAuthor.innerHTML = "Posted by: " + this.postInput.author;
        this.postDate.innerHTML = "On: " + this.postInput.date;
        this.postTitle.innerHTML = this.postInput.title;
        this.postContent.innerHTML = this.postInput.content;
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
exports["default"] = Post;
