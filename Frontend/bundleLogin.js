(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var checkLogin_1 = require("./tsFiles/functions/checkLogin");
var sendLogin_1 = require("./tsFiles/functions/sendLogin");
var togglePassword_1 = require("./tsFiles/functions/togglePassword");
var loginForm = document.querySelector('form');
var checkBox = document.querySelector('.check');
var pwLabel = document.querySelector('label[for="check"]');
window.onload = function () {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var inputs = Array.from(loginForm.querySelectorAll('input[size="10"]'));
        if (checkLogin_1["default"](inputs)) {
            sendLogin_1["default"](inputs);
        }
    });
};
checkBox.addEventListener('click', function () {
    togglePassword_1["default"](pwLabel);
});

},{"./tsFiles/functions/checkLogin":2,"./tsFiles/functions/sendLogin":3,"./tsFiles/functions/togglePassword":4}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function checkLogin(inputs) {
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
        return false;
    }
    return true;
}
exports["default"] = checkLogin;

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function sendLogin(inputs) {
    var userName = inputs[0].value;
    var pw = inputs[1].value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/login', true);
    xhr.setRequestHeader('user', userName);
    xhr.setRequestHeader('password', pw);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("" + JSON.parse(xhr.response).message);
            inputs[0].value = '';
            inputs[1].value = '';
        }
        else {
            window.localStorage.setItem('user', userName);
            window.location.replace('./profile');
        }
    };
}
exports["default"] = sendLogin;

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function togglePassword(label) {
    var icon = label.querySelector('i');
    var pwInput = document.querySelector('form').elements[1];
    if (pwInput.type === 'password') {
        pwInput.type = 'text';
        label.querySelector('span').textContent = 'Hide password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
    else {
        pwInput.type = 'password';
        label.querySelector('span').textContent = 'Show password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}
exports["default"] = togglePassword;

},{}]},{},[1]);
