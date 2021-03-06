const idOrg = window.sessionStorage.getItem('orgId');
const username = window.sessionStorage.getItem('username');
const roles = window.sessionStorage.getItem('roles');
if(idOrg == null || username == null || roles == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

document.addEventListener("DOMContentLoaded", function(event) {
    let idDep = window.sessionStorage.getItem('idDep');

    window.fillDepartments(idOrg, tokens);
    window.fillBoards(0, tokens);
    window.fillTypes(idOrg, tokens);
    window.fillUrgency();
    window.setNavBarAdmin(roles);

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
        const urgencySelect = document.getElementById('urgency');
        const difficultyElement = document.getElementById('difficulty');
        const descriptionElement = document.getElementById('description');
        const departmentSelect = document.getElementById('department');
        const boardSelect = document.getElementById('board');

        const ticket = {
            title: titleElement.value,
            typeId: typeSelect[typeSelect.selectedIndex].id,
            urgency: urgencySelect[urgencySelect.selectedIndex].value,
            difficulty: difficultyElement.value,
            description: descriptionElement.value,
            boardId: boardSelect[boardSelect.selectedIndex].id,
            username: username
        }

        window.createTicket(ticket, tokens);
    });
});