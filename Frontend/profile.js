var userName = window.localStorage.getItem('user');
var welcomeMessage = document.querySelector('.welcome');
var accBtn = document.querySelector('.account-btn');
var logoutBtn = document.querySelector('.logout-btn');
var main = document.querySelector('.main');
welcomeMessage.textContent = "Hello " + userName;
accBtn.addEventListener('click', function () {
    showAccData();
});
logoutBtn.addEventListener('click', function () {
    window.localStorage.setItem('user', '');
    window.location.replace('./');
});
//Account data
function showAccData() {
    var userName = window.localStorage.getItem('user');
    main.innerHTML = '';
    var dataDiv = document.createElement('div');
    dataDiv.classList.add('data');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/info');
    xhr.setRequestHeader('user', userName);
    xhr.send();
    xhr.onload = function () {
        var accData = {
            numOfPosts: '',
            sumScore: ''
        };
        if (xhr.status === 404) {
            accData = {
                numOfPosts: 'server not found',
                sumScore: 'server not found'
            };
        }
        if (xhr.status === 200) {
            accData = JSON.parse(xhr.response);
        }
        var accClass = new AccInfoDiv('Account information', ['Login: ', 'Account type: ', 'Rank: '], [userName, 'normal', 'Fox']);
        var postClass = new AccInfoDiv('Post information', ['Number of posts: ', 'Total score for posts: '], [accData.numOfPosts, accData.sumScore]);
        var accDiv = accClass.createDiv();
        var postDiv = postClass.createDiv();
        dataDiv.appendChild(accDiv);
        dataDiv.appendChild(postDiv);
        main.appendChild(dataDiv);
    };
}
var AccInfoDiv = /** @class */ (function () {
    function AccInfoDiv(name, infos, data) {
        this.name = name;
        this.infos = infos;
        this.data = data;
    }
    AccInfoDiv.prototype.createDiv = function () {
        var newDiv = document.createElement('div');
        var h2 = document.createElement('h2');
        h2.textContent = this.name;
        newDiv.appendChild(h2);
        for (var i = 0; i <= this.infos.length; i++) {
            var newP = document.createElement('p');
            newP.textContent = this.infos[i];
            var newSpan = document.createElement('span');
            newSpan.textContent = this.data[i];
            newP.appendChild(newSpan);
            newDiv.appendChild(newP);
        }
        this.div = newDiv;
        return newDiv;
    };
    return AccInfoDiv;
}());
