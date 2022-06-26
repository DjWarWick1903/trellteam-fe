const username = window.sessionStorage.getItem('username');
const roles = window.sessionStorage.getItem('roles');
if(username == null || roles == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

document.addEventListener("DOMContentLoaded", function(event) {
    let idDep = null;
    let departmentName = null;
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('id') && urlParams.has('department')) {
        idDep = urlParams.get('id');
        departmentName = urlParams.get('department');
        window.sessionStorage.setItem('idDep', idDep);
    }

    window.fillBoardsDetails(idDep, tokens);
    window.setNavBarAdmin(roles.split(','));
});
