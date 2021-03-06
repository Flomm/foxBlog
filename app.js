"use strict";
exports.__esModule = true;
var postFunction_1 = require("./tsFiles/postFunction");
var authorPost = document.querySelector(".author_post");
var titlePost = document.querySelector(".title_post");
var contentPost = document.querySelector(".content_post");
var inputArr = [authorPost, titlePost, contentPost];
var subButton = document.querySelector(".button_submit");
subButton.addEventListener("click", function () {
    postFunction_1.postBlog(inputArr);
});
