"use strict";
exports.__esModule = true;
var scrollToPost_1 = require("./scrollToPost");
var PostClass_1 = require("./PostClass");
function frontEndInsert(newPostInput) {
    var newPost = new PostClass_1["default"](newPostInput);
    var postedMain = document.querySelector('.posted-main');
    var mainChilds = document.querySelectorAll('.posted-slot');
    var newPostSlot = newPost.makePost();
    postedMain.insertBefore(newPostSlot, mainChilds[0]);
    scrollToPost_1["default"](newPostSlot);
}
exports["default"] = frontEndInsert;
