const helperModule = require('../modules/Helper.js');
const organisationDB = require('../modules/OrganisationDB.js');

function verifyName(name) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(helperModule.verifyInputIsEmpty(name)) {
        helperModule.showAlert('Please specify the name of the new type.', 'info', alertPlaceholder);
        return false;
    }

    return true;
}

async function createType(type, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(verifyName(type.name)) {
        const response = await organisationDB.createType(type, tokens);

        if(response.status == 201) {
            helperModule.showAlert('Type successfully created.', 'success', alertPlaceholder);
            listTypes(type.idOrganisation, tokens);
            return;
        }

        helperModule.showAlert('Type could not be created because of a server error.', 'danger', alertPlaceholder);
    }
}

async function listTypes(idOrg, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await organisationDB.getTypes(idOrg, tokens);

    if(response.status == 200) {
        const types = response.types;
        const tableElement = document.getElementById('type-list');

        let bodyHTML = ``;
        for(const type of types) {
            const body = `
                <tr>
                    <th scope="row">${type.id}</th>
                    <td>${type.name}</td>
                </tr>
            `;
            bodyHTML = bodyHTML.concat(body);
        }

        tableElement.innerHTML = bodyHTML;
    } else {
        helperModule.showAlert('Types could not be fetched because of a server error.', 'danger', alertPlaceholder);
    }
}

function setNavBarAdmin(roles) {
    let isAdmin = false;
    let isDevOps = false;
    for(const role of roles) {
        if(role == "ADMIN" || role == "MANAGER") {
            isAdmin = true;
        }
        if(role == "DEVOPS") {
            isDevOps = true;
        }
    }

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
            <li><a class="nav-link" href="NewTicket.html">Create ticket</a></li>
            <li><a class="nav-link active" href="NewType.html">Create type</a></li>
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

global.window.createType = createType;
global.window.listTypes = listTypes;
global.window.setNavBarAdmin = setNavBarAdmin;