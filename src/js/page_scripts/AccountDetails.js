let username = window.sessionStorage.getItem('username');
if(username == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

let isSelf = true;
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('username')) {
    if(username != urlParams.get('username')) {
        isSelf = false;
    }
    username = urlParams.get('username');
}

document.addEventListener("DOMContentLoaded", function(event) {
    window.getAccountDetails(username, isSelf, tokens);
});
