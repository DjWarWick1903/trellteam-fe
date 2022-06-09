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
            <div class="card ticket">
                <div class="card-header text-white">${card.title}</div>
                <div class="card-body">
                    <p>Type: ${card.type.name}</p>
                    <p>Asigned: ${card.assigned == null ? 'Unassigned' : card.assigned.username}</p>
                </div>
            </div><br>
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
            <div class="card ticket">
                <div class="card-header text-white">${card.title}</div>
                <div class="card-body">
                    <p>Type: ${card.type.name}</p>
                    <p>Asigned: ${card.assigned == null ? 'Unassigned' : card.assigned.username}</p>
                </div>
            </div><br>
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
            <div class="card ticket">
                <div class="card-header text-white">${card.title}</div>
                <div class="card-body">
                    <p>Type: ${card.type.name}</p>
                    <p>Asigned: ${card.assigned == null ? 'Unassigned' : card.assigned.username}</p>
                </div>
            </div><br>
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

function createLinks(idDep) {
    const boardsLinks = document.getElementById('BoardsLinks');
    const newBoardHtml = `
        <li><a id="Board" class="nav-link" href="NewBoard.html?id=${idDep}">Create board</a></li>
    `;
    const newTicketHtml = `
        <li><a id="Ticket" class="nav-link" href="NewTicket.html?id=${idDep}">Create ticket</a></li>
    `;

    boardsLinks.innerHTML = `
        ${newBoardHtml}
        ${newTicketHtml}
    `;
}
global.window.fillBoardsDetails = fillBoardsDetails;
global.window.createLinks = createLinks;