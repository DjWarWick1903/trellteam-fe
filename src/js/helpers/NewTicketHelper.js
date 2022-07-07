const helperModule = require('../modules/Helper.js');
const departmentDB = require('../modules/DepartmentDB.js');
const boardDB = require('../modules/BoardDB.js');
const organisationDB = require('../modules/OrganisationDB.js');
const ticketDB = require('../modules/TicketDB.js');
const {getUrgencyTypes} = require("../modules/TicketDB");

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

function fillUrgency() {
    const urgencySelect = document.getElementById('urgency');
    const urgencyTypes = ticketDB.getUrgencyTypes();

    let urgenciesHTML = `<option value="Undefined" id="0" selected>Undefined</option>`;
    for(const type of urgencyTypes) {
        const urgHTML = `<option value="${type.name}" id="${type.id}">${type.name}</option>`;
        urgenciesHTML = urgenciesHTML.concat(urgHTML);
    }

    urgencySelect.innerHTML = urgenciesHTML;
}

async function createTicket(ticket, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.createTicket(ticket, tokens);

    if(response.status == 201) {
        helperModule.showAlert('Ticket created successfully.', 'success', alertPlaceholder);
    } else {
        helperModule.showAlert('Ticket could not be created because of a server error.', 'danger', alertPlaceholder);
    }
}

function setNavBarAdmin(roles) {
    let isAdmin = helperModule.checkIfAdmin(roles);
    let isDevOps = helperModule.checkIfDevOps(roles);

    let adminNavbar;
    let opsNavbar;

    if(isAdmin) {
        adminNavbar = `
            <li><a class="nav-link" href="NewDepartment.html">Add Department</a></li>
            <li><a class="nav-link" href="NewEmployee.html">Add Employee</a></li>
        `;
    }

    if(isDevOps || isAdmin) {
        opsNavbar = `
            <li><a class="nav-link" href="NewBoard.html">Create board</a></li>
            <li><a class="nav-link active" href="NewTicket.html">Create ticket</a></li>
            <li><a class="nav-link" href="NewType.html">Create type</a></li>
        `;
    }

    if(adminNavbar != null || opsNavbar != null) {
        const navbar = `
            <ul class="nav navbar-nav me-auto">
                ${adminNavbar == null ? '' : adminNavbar}
                ${opsNavbar == null ? '' : opsNavbar}
            </ul>
        `;
        document.getElementById('adminNavBar').innerHTML = navbar;
    }
}

global.window.fillDepartments = fillDepartments;
global.window.fillBoards = fillBoards;
global.window.fillTypes = fillTypes;
global.window.fillUrgency = fillUrgency;
global.window.createTicket = createTicket;
global.window.setNavBarAdmin = setNavBarAdmin;