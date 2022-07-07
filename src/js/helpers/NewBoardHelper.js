const helperModule = require("../modules/Helper.js");
const boardDB = require('../modules/BoardDB.js');

function verifyInput() {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const titleInput = document.getElementById('boardTitle');
    const versionInput = document.getElementById('version');
    const releaseInput = document.getElementById('release');

    if(helperModule.verifyInputIsEmpty(titleInput.value)) {
        helperModule.showAlert('Please specify the title of the board.', 'info', alertPlaceholder);
        return false;
    }

    if(helperModule.verifyInputIsEmpty(versionInput.value)) {
        helperModule.showAlert('Please specify the version of the board.', 'info', alertPlaceholder);
        return false;
    }

    if(helperModule.verifyInputIsEmpty(releaseInput.value)) {
        helperModule.showAlert('Please specify the release date of the board.', 'info', alertPlaceholder);
        return false;
    }

    return true;
}

async function createBoard(board, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    if(verifyInput()) {
        const response = await boardDB.createBoard(board, tokens);

        if(response.status == 201) {
            helperModule.showAlert('Board has been created succesfully!', 'success', alertPlaceholder);
        } else {
            helperModule.showAlert('Board could not be created because of a server problem.', 'danger', alertPlaceholder);
        }
    }
}

function setNavBarAdmin(roles) {
    var isAdmin = helperModule.checkIfAdmin(roles);
    var isDevOps = helperModule.checkIfDevOps(roles);

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
            <li><a class="nav-link active" href="NewBoard.html">Create board</a></li>
            <li><a class="nav-link" href="NewTicket.html">Create ticket</a></li>
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

global.window.createBoard = createBoard;
global.window.setNavBarAdmin = setNavBarAdmin;