const helperModule = require('../modules/Helper.js');
const departmentDB = require('../modules/DepartmentDB.js');
const boardDB = require('../modules/BoardDB.js');
const organisationDB = require('../modules/OrganisationDB.js');

function createLinks(idDep) {
    const boardsLinks = document.getElementById('BoardsLinks');
    const newBoardHtml = `<li><a id="Board" class="nav-link" href="NewBoard.html?id=${idDep}">Create board</a></li>`;
    const newTicketHtml = `<li><a id="Ticket" class="nav-link active" href="NewTicket.html?id=${idDep}">Create ticket</a></li>`;

    boardsLinks.innerHTML = `
        ${newBoardHtml}
        ${newTicketHtml}
    `;
}

async function fillDepartments(idOrg, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await departmentDB.getOrganisationDepartments(idOrg, tokens);

    const departmentsSelect = document.getElementById('department');
    let departmentsHTML = `<option value="Undefined" id="0" selected>Undefined</option>`;

    if(response.status == 200) {
        const departments = response.departments;

        for(const department of departments) {
            const depHTML = `<option value="${department.name}" id="${department.id}">${department.name}</option>`;
            departmentsHTML = departmentsHTML.concat(depHTML);
        }

        departmentsSelect.innerHTML = departmentsHTML;
        return true;
    } else {
        helperModule.showAlert('Departments could not be fetched because of a server error.', 'danger', alertPlaceholder);
        return false;
    }
}

async function fillBoards(idDep, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const boardSelect = document.getElementById('board');
    let boardsHTML = `<option value="Undefined" id="0" selected>Undefined</option>`;

    if(idDep != 0) {
        const response = await boardDB.getDepartmentBoards(idDep, tokens);

        if(response.status == 200) {
            const boards = response.boards;
            for(const board of boards) {
                const boardHTML = `<option value="${board.title}" id="${board.id}">${board.title}</option>`;
                boardsHTML = boardsHTML.concat(boardHTML);
            }
        } else {
            helperModule.showAlert('Boards could not be fetched because of a server error.', 'danger', alertPlaceholder);
        }
    }
    boardSelect.innerHTML = boardsHTML;
}

async function fillTypes(idOrg, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await organisationDB.getTypes(idOrg, tokens);

    if(response.status == 200) {
        const typeSelect = document.getElementById('types');
        let typesHTML = `<option value="Undefined" id="0" selected>Undefined</option>`;

        const types = response.types;
        for(const type of types) {
            const typeHTML = `<option value="${type.name}" id="${type.id}">${type.name}</option>`;
            typesHTML = typesHTML.concat(typeHTML);
        }

        typeSelect.innerHTML = typesHTML;
    } else {
        helperModule.showAlert('Types could not be fetched because of a server error.', 'danger', alertPlaceholder);
    }
}

async function createTicket(ticket, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await organisationDB.createTicket(ticket, tokens);

    if(response.status == 201) {
        helperModule.showAlert('Ticket created successfully.', 'success', alertPlaceholder);

    } else {
        helperModule.showAlert('Ticket could not be created because of a server error.', 'danger', alertPlaceholder);
    }
}

global.window.createLinks = createLinks;
global.window.fillDepartments = fillDepartments;
global.window.fillBoards = fillBoards;
global.window.fillTypes = fillTypes;
global.window.createTicket = createTicket;