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

    /*const input = document.getElementById('idDep');
    input.value = idDep;*/
}

window.fillBoardsDetails(idDep, tokens);
window.createLinks(idDep);

/*document.getElementById('Board').addEventListener('click', function(e) {
    e.preventDefault();
    const form = document.getElementById('Buttons');
    form.action = `NewBoard.html`;
    form.method = 'get';
    form.submit();
});

document.getElementById('Ticket').addEventListener('click', function(e) {
    e.preventDefault();
    const form = document.getElementById('Buttons');
    form.action = `NewTicket.html`;
    form.method = 'get';
    form.submit();
});*/