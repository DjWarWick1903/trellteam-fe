const username = window.sessionStorage.getItem('username');
if(username == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

let idDep = null;
let departmentName = null;
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('id') && urlParams.has('department')) {
    idDep = urlParams.get('id');
    departmentName = urlParams.get('department');
}

window.fillBoardsDetails(idDep, tokens);
window.createLinks(idDep);