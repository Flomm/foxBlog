"use strict";
exports.__esModule = true;
var FrontEndInsert_1 = require("./FrontEndInsert");
function sendPostToServer(postObject) {
    var postReq = new XMLHttpRequest();
    postReq.open('POST', '/api/addpost', true);
    postReq.setRequestHeader('Content-Type', 'application/json');
    postReq.send(JSON.stringify(postObject));
    postReq.onload = function () {
        if (postReq.status !== 202) {
            alert('There was an problem, please try again.');
        }
        FrontEndInsert_1["default"](postObject);
    };
}
exports["default"] = sendPostToServer;
