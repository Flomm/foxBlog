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
