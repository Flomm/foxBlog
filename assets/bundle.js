(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var postFunction_1 = require("./tsFiles/postFunction");
var authorPost = document.querySelector(".author-post");
var titlePost = document.querySelector(".title-post");
var contentPost = document.querySelector(".content-post");
var inputArr = [authorPost, titlePost, contentPost];
var subButton = document.querySelector(".button-submit");
subButton.addEventListener("click", function () {
    postFunction_1.postBlog(inputArr);
});

},{"./tsFiles/postFunction":3}],2:[function(require,module,exports){
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
        this.postTitle.classList.add("posted-title");
        this.postAuthor.classList.add("posted-author");
        this.postDate.classList.add("posted-date");
        this.postMisc.classList.add("posted-misc");
        this.postContent.classList.add("posted-content");
        this.postSlot.classList.add("posted-slot");
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

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.postBlog = void 0;
var PostClass_1 = require("./PostClass");
function toggleErr(input) {
    input.parentElement.classList.toggle("err");
    var labelEl = document.querySelector("label[for=" + input.name + "]");
    labelEl.parentElement.classList.toggle("err");
}
function postBlog(inputs) {
    var emptyField = [];
    inputs.forEach(function (input) {
        if (input.parentElement.classList.contains("err")) {
            toggleErr(input);
        }
        if (input.value === "") {
            emptyField.push(input);
        }
    });
    if (emptyField.length !== 0) {
        emptyField.forEach(function (input) {
            if (!input.parentElement.classList.contains("err")) {
                toggleErr(input);
            }
        });
    }
    else {
        var datePost = new Date().toLocaleString().split(",")[0];
        var newPost = new PostClass_1.Post(inputs[0].value, inputs[1].value, inputs[2].value, datePost);
        var postedMain = document.querySelector(".posted-main");
        postedMain.appendChild(newPost.makePost());
        inputs.forEach(function (input) {
            input.value = "";
            if (input.parentElement.classList.contains("err")) {
                toggleErr(input);
            }
        });
    }
}
exports.postBlog = postBlog;

},{"./PostClass":2}]},{},[1]);
