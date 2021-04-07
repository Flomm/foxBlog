(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var checkLogin_1 = require("./tsFiles/functions/checkLogin");
var loginForm = document.querySelector('form');
var checkBox = document.querySelector('.check');
var pwInput = document.querySelector('form').elements[1];
window.onload = function () {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var inputs = Array.from(loginForm.querySelectorAll('input[size="10"]'));
        checkLogin_1["default"](inputs);
    });
    checkBox.addEventListener('change', function () {
        if (pwInput.type === 'password') {
            pwInput.type = 'text';
        }
        else {
            pwInput.type = 'password';
        }
    });
};

},{"./tsFiles/functions/checkLogin":2}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function checkLogin(inputs) {
    var loginInput = document.querySelector('form').elements[0];
    var pwInput = document.querySelector('form').elements[1];
    var emptyField = [];
    inputs.forEach(function (input) {
        var labelEl = document.querySelector("label[for=" + input.name + "]");
        if (labelEl.classList.contains('err')) {
            labelEl.classList.toggle('err');
        }
        if (input.value === '') {
            emptyField.push(input);
        }
    });
    if (emptyField.length !== 0) {
        emptyField.forEach(function (input) {
            var labelEl = document.querySelector("label[for=" + input.name + "]");
            labelEl.classList.toggle('err');
            if (!labelEl.classList.contains('err')) {
                labelEl.classList.toggle('err');
            }
        });
    }
    else {
        var userName_1 = loginInput.value;
        var pw = pwInput.value;
        var xhr_1 = new XMLHttpRequest();
        xhr_1.open('GET', '/api/login', true);
        xhr_1.setRequestHeader('user', userName_1);
        xhr_1.setRequestHeader('password', pw);
        xhr_1.send();
        xhr_1.onload = function () {
            if (xhr_1.status === 404) {
                alert('There is a problem with the server. Please try again later.');
                return;
            }
            if (xhr_1.status === 401) {
                alert('Invalid login or password.');
                loginInput.value = '';
                pwInput.value = '';
                return;
            }
            if (xhr_1.status === 200) {
                window.localStorage.setItem('user', userName_1);
                window.location.replace('./profile');
            }
        };
    }
}
exports["default"] = checkLogin;

},{}]},{},[1]);
