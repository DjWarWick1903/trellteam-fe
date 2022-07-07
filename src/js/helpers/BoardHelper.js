const helperModule = require('../modules/Helper.js');
const boardDB = require('../modules/BoardDB.js');


function getTodoCards(cards) {
    let todoCards = `
        <div class="card status">
            <div class="card-header text-white">To do</div>
            <div class="card-body">
    `;

    for(const card of cards) {
        if(card.status != 'TO DO')
            continue;

        const cardHTML = `
            <div class="card p-2 ticket">
                <a class="card-block stretched-link text-decoration-none" href="Ticket.html?id=${card.id}">
                    <h4 class="card-title">${card.title}</h4>
                    <p class="card-text">Type: ${card.type.name}</p>
                    <p class="card-text"><small class="text-muted">Assigned: ${card.assigned == null ? 'Unassigned' : card.assigned.username}</small></p>
                </a>
            </div>
        `;

        todoCards = todoCards.concat(cardHTML);
    }

    todoCards = todoCards.concat("</div></div>")
    return todoCards;
}

function getInProgressCards(cards) {
    let progressCards = `
        <div class="card status">
            <div class="card-header text-white">In progress</div>
            <div class="card-body">
    `;

    for(const card of cards) {
        if(card.status != 'IN PROGRESS')
            continue;

        const cardHTML = `
            <div class="card p-2 ticket">
                <a class="card-block stretched-link text-decoration-none" href="Ticket.html?id=${card.id}">
                    <h4 class="card-title">${card.title}</h4>
                    <p class="card-text">Type: ${card.type.name}</p>
                    <p class="card-text"><small class="text-muted">Assigned: ${card.assigned == null ? 'Unassigned' : card.assigned.username}</small></p>
                </a>
            </div>
        `;

        progressCards = progressCards.concat(cardHTML);
    }

    progressCards = progressCards.concat("</div></div>")
    return progressCards;
}

function getDevDoneCards(cards) {
    let doneCards = `
        <div class="card status">
            <div class="card-header text-white">Done</div>
            <div class="card-body">
    `;

    for(const card of cards) {
        if(card.status != 'DONE')
            continue;

        const cardHTML = `
            <div class="card p-2 ticket">
                <a class="card-block stretched-link text-decoration-none" href="Ticket.html?id=${card.id}">
                    <h4 class="card-title">${card.title}</h4>
                    <p class="card-text">Type: ${card.type.name}</p>
                    <p class="card-text"><small class="text-muted">Assigned: ${card.assigned == null ? 'Unassigned' : card.assigned.username}</small></p>
                </a>
            </div>
        `;

        doneCards = doneCards.concat(cardHTML);
    }

    doneCards = doneCards.concat("</div></div>")
    return doneCards;
}

async function fillBoardsDetails(idDep, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await boardDB.getDepartmentBoards(idDep, tokens);

    if(response.status == 200) {
        const boards = response.boards;
        const boardsElement = document.getElementById('boards');
        let boardsHTML = ``;

        for(const board of boards) {
            const cards = board.cards;

            const todoCardsHTML = getTodoCards(cards);
            const progressCardsHTML = getInProgressCards(cards);
            const doneCardsHTML = getDevDoneCards(cards);

            let boardHTML = `
                <div class="justify-content-center d-flex">
                    <button class="btn btn-primary board" type="button" data-bs-toggle="collapse" data-bs-target="#board${board.id}">
                        ${board.title}  <br>  Version: ${board.version}  <br>  Release: ${board.release}
                    </button>
                </div><br>
                <div class="collapse" id="board${board.id}">
                    <div class="justify-content-center d-flex">
                        <div class="card col-12 mx-auto" style="width: 100%">
                            <div class="card-body col-12 mx-auto">
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            ${todoCardsHTML}
                                        </div>
                                        <div class="col">
                                            ${progressCardsHTML}
                                        </div>
                                        <div class="col">
                                            ${doneCardsHTML}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><br>
            `;

            boardsHTML = boardsHTML.concat(boardHTML);
        }

        boardsElement.innerHTML = boardsHTML;

        return true;
    } else {
        helperModule.showAlert('Boards could not be fetched because of a server error.', 'danger', alertPlaceholder);
        return false;
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
            <li><a class="nav-link" href="NewBoard.html">Create board</a></li>
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

global.window.fillBoardsDetails = fillBoardsDetails;
global.window.setNavBarAdmin = setNavBarAdmin;