"use strict";
exports.__esModule = true;
var postFunction_1 = require("./tsFiles/postFunction");
var intitialLoad_1 = require("./tsFiles/intitialLoad");
var authorPost = document.querySelector('.author-post');
var titlePost = document.querySelector('.title-post');
var contentPost = document.querySelector('.content-post');
var inputFields = [authorPost, titlePost, contentPost];
var subButton = document.querySelector('.button-submit');
window.addEventListener('load', function () {
    intitialLoad_1["default"]();
});
subButton.addEventListener('click', function () {
    postFunction_1["default"](inputFields);
});
