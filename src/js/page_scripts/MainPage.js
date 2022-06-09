const username = window.sessionStorage.getItem('username');
if(username == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}
window.getMainPageDetails(username, tokens);