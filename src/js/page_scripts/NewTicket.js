const idOrg = window.sessionStorage.getItem('orgId');
const username = window.sessionStorage.getItem('username');
if(idOrg == null || username == null) window.location.replace("Login.html");
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
window.fillDepartments(idOrg, tokens);
window.fillBoards(0, tokens);
window.fillTypes(idOrg, tokens);

document.getElementById('department').addEventListener('change', async function(e) {
    e.preventDefault();
    const departmentSelect = document.getElementById('department');
    const depId = departmentSelect[departmentSelect.selectedIndex].id;

    window.fillBoards(depId, tokens);
});

document.getElementById('Clear').addEventListener('click', function(e) {
    e.preventDefault();

    const titleElement = document.getElementById('title');
    const typeSelect = document.getElementById('types');
    const difficultyElement = document.getElementById('difficulty');
    const descriptionElement = document.getElementById('description');
    const departmentSelect = document.getElementById('department');
    const boardSelect = document.getElementById('board');


    titleElement.value = '';
    difficultyElement.value = '';
    descriptionElement.value = '';

    typeSelect.options[0].selected = 'selected';
    departmentSelect.options[0].selected = 'selected';
    boardSelect.options[0].selected = 'selected';
});

document.getElementById('Create').addEventListener('click', async function(e) {
    e.preventDefault();
    const titleElement = document.getElementById('title');
    const typeSelect = document.getElementById('types');
    const difficultyElement = document.getElementById('difficulty');
    const descriptionElement = document.getElementById('description');
    const departmentSelect = document.getElementById('department');
    const boardSelect = document.getElementById('board');

    const ticket = {
        title: titleElement.value,
        typeId: typeSelect[typeSelect.selectedIndex].id,
        difficulty: difficultyElement.value,
        description: descriptionElement.value,
        boardId: boardSelect[boardSelect.selectedIndex].id,
        username: username
    }

    window.createTicket(ticket, tokens);
});