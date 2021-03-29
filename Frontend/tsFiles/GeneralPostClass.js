"use strict";
exports.__esModule = true;
var GeneralPost = /** @class */ (function () {
    function GeneralPost(postObject) {
        this.postInput = postObject;
    }
    GeneralPost.prototype.createPostDivs = function () {
        this.postSlot = document.createElement('div');
        this.postAuthor = document.createElement('div');
        this.postDate = document.createElement('div');
        this.postMisc = document.createElement('div');
        this.postTitle = document.createElement('div');
        this.postContent = document.createElement('div');
        this.likeBar = document.createElement('div');
        this.likeBarP = document.createElement('p');
    };
    GeneralPost.prototype.assignClasses = function () {
        this.postTitle.classList.add('posted-title');
        this.postAuthor.classList.add('posted-author');
        this.postDate.classList.add('posted-date');
        this.postMisc.classList.add('posted-misc');
        this.postContent.classList.add('posted-content');
        this.postSlot.classList.add('posted-slot');
        this.likeBar.classList.add('likebar');
    };
    GeneralPost.prototype.fillPost = function () {
        this.postAuthor.textContent = "Posted by: " + this.postInput.author;
        this.postDate.textContent = "On: " + this.postInput.date;
        this.postTitle.textContent = this.postInput.title;
        this.postContent.textContent = this.postInput.content;
        this.likeBarP.textContent = "Score: " + this.postInput.score;
    };
    GeneralPost.prototype.createStructure = function () {
        this.postSlot.appendChild(this.postTitle);
        this.postSlot.appendChild(this.postContent);
        this.postMisc.appendChild(this.postAuthor);
        this.postMisc.appendChild(this.postDate);
        this.postSlot.appendChild(this.postMisc);
        this.likeBar.appendChild(this.likeBarP);
        this.postSlot.appendChild(this.likeBar);
    };
    GeneralPost.prototype.makePost = function () {
        this.createPostDivs();
        this.assignClasses();
        this.fillPost();
        this.createStructure();
        return this.postSlot;
    };
    return GeneralPost;
}());
exports["default"] = GeneralPost;
