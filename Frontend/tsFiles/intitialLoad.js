"use strict";
exports.__esModule = true;
var GeneralPostClass_1 = require("./GeneralPostClass");
function initialPost(postObject) {
    var newPost = new GeneralPostClass_1["default"](postObject);
    var postedMain = document.querySelector('.posted-main');
    var mainChilds = document.querySelectorAll('.posted-slot');
    postedMain.insertBefore(newPost.makePost(), mainChilds[0]);
}
function initialLoad() {
    var newReq = new XMLHttpRequest();
    newReq.onreadystatechange = function () {
        if (newReq.readyState === 4 && newReq.status === 200) {
            var posts = newReq.response;
            var parsed = JSON.parse(posts);
            for (var _i = 0, parsed_1 = parsed; _i < parsed_1.length; _i++) {
                var p = parsed_1[_i];
                initialPost(p);
            }
        }
    };
    newReq.open('GET', '/api/posts');
    newReq.send();
}
exports["default"] = initialLoad;
