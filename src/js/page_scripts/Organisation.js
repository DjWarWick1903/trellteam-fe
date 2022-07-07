const username = window.sessionStorage.getItem('username');
const roles = window.sessionStorage.getItem('roles');
if(username == null || roles == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

document.addEventListener("DOMContentLoaded", function(event) {
    window.getOrganisationDetails(username, tokens);
    window.setNavBarAdmin(roles);
});