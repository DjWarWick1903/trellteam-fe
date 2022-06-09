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

function createLinks(idDep) {
    const boardsLinks = document.getElementById('BoardsLinks');
    const newBoardHtml = `
        <li><a id="Board" class="nav-link active" href="NewBoard.html?id=${idDep}">Create board</a></li>
    `;
    const newTicketHtml = `
        <li><a id="Ticket" class="nav-link" href="NewTicket.html?id=${idDep}">Create ticket</a></li>
    `;

    boardsLinks.innerHTML = `
        ${newBoardHtml}
        ${newTicketHtml}
    `;
}

global.window.createBoard = createBoard;
global.window.createLinks = createLinks;