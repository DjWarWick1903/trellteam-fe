const username = window.sessionStorage.getItem('username');
if(username == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

let idDep = null;
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('id')) {
    idDep = urlParams.get('id');
}

window.createLinks(idDep);

document.getElementById('Clear').addEventListener('click', function(e) {
    e.preventDefault();
    const titleInput = document.getElementById('boardTitle');
    const versionInput = document.getElementById('version');
    const releaseInput = document.getElementById('release');

    titleInput.value = '';
    versionInput.value = '';
    releaseInput.value = '';
});

document.getElementById('Create').addEventListener('click', async function(e) {
    e.preventDefault();
    const titleInput = document.getElementById('boardTitle');
    const versionInput = document.getElementById('version');
    const releaseInput = document.getElementById('release');

    const board = {
        idDep,
        title: titleInput.value,
        version: versionInput.value,
        release: releaseInput.value
    };

    window.createBoard(board, tokens);
});