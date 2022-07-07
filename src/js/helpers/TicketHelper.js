const ticketDB = require('../modules/TicketDB.js');
const organisationDB = require('../modules/OrganisationDB.js');
const helperModule = require('../modules/Helper.js');

async function fillTypes(idOrg, idType, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const typeSelect = document.getElementById("type");
    const response = await organisationDB.getTypes(idOrg, tokens);

    if(response.status == 200) {
        const types = response.types;
        let typesHTML = `<option id="0" value="Undefined">Undefined</option>`;
        for(const type of types) {
            typeHTML = `<option id="${type.id}" value="${type.name}" ${type.id == idType ? 'selected' : ''}>${type.name}</option>`;
            typesHTML = typesHTML.concat(typeHTML);
        }
        typeSelect.innerHTML = typesHTML;
    } else {
        helperModule.showAlert("Types could not be fetched because of a server error.", "danger", alertPlaceholder);
    }
}

function fillUrgencyTypes() {
    const urgencySelect = document.getElementById("urgency");

    const types = ticketDB.getUrgencyTypes();
    let typesHTML = ``;
    for(const type of types) {
        const typeHTML = `<option id="${type.id}" value="${type.name}">${type.name}</option>`;
        typesHTML = typesHTML.concat(typeHTML);
    }

    urgencySelect.innerHTML = typesHTML;
}

async function fetchTicketDetails(idTicket, idOrg, username, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.getTicket(idTicket, tokens);

    if(response.status == 200) {
        const ticket = response.ticket;

        // Ticket details
        await setTicketDetails(ticket);

        document.getElementById('title').onchange = function () {updateTicketOnChange(idTicket, username, 'title', tokens)};
        document.getElementById('type').onchange = function () {updateTicketOnChange(idTicket, username, 'type', tokens)};
        document.getElementById('urgency').onchange = function () {updateTicketOnChange(idTicket, username, 'urgency', tokens)};
        document.getElementById('difficulty').onchange = function () {updateTicketOnChange(idTicket, username, 'difficulty', tokens)};
        document.getElementById('notes').onchange = function () {updateTicketOnChange(idTicket, username, 'notes', tokens)};
        document.getElementById('description').onchange = function () {updateTicketOnChange(idTicket, username, 'description', tokens)};

        setCommentsHTML(ticket.comments);
        setLogsHTML(ticket.logs);
    } else {
        helperModule.showAlert("Ticket could not be fetched because of a server error.", "danger", alertPlaceholder);
    }
}

async function updateTicketToDo(idTicket, username, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.updateTicketInToDo(idTicket, username, tokens);

    if(response.status == 200) {
        document.getElementById('status').value = "TO DO";
        setLogsHTML(response.ticket.logs);
    } else {
        helperModule.showAlert("Ticket could not be moved to TO DO because of a server error.", "danger", alertPlaceholder);
    }
}

async function updateTicketInProgress(idTicket, username, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.updateTicketInProgress(idTicket, username, tokens);

    if(response.status == 200) {
        document.getElementById('status').value = "IN PROGRESS";
        setLogsHTML(response.ticket.logs);
    } else {
        helperModule.showAlert("Ticket could not be moved to IN PROGRESS because of a server error.", "danger", alertPlaceholder);
    }
}

async function updateTicketDone(idTicket, username, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.updateTicketInDone(idTicket, username, tokens);

    if(response.status == 200) {
        document.getElementById('status').value = "DONE";
        setLogsHTML(response.ticket.logs);
    } else {
        helperModule.showAlert("Ticket could not be moved to DONE because of a server error.", "danger", alertPlaceholder);
    }
}

async function updateTicket(ticket, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.updateTicket(ticket, tokens);

    if(response.status != 200) {
        helperModule.showAlert("Ticket could not be updated because of a server error.", "danger", alertPlaceholder);
    } else {
        setLogsHTML(response.ticket.logs);
    }
}

async function assignTicket(idTicket, username, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.assignTicket(idTicket, username, tokens);

    if(response.status == 200) {
        window.location.replace(`Ticket.html?id=${idTicket}&assigned=1`);
    } else {
        helperModule.showAlert("We could not assign you to this ticket because of a server error.", "danger", alertPlaceholder);
    }
}

async function unassignTicket(idTicket, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.unassignTicket(idTicket, tokens);

    if(response.status == 200) {
        window.location.replace(`Ticket.html?id=${idTicket}&assigned=0`);
    } else {
        helperModule.showAlert("We could not unassign you from this ticket because of a server error.", "danger", alertPlaceholder);
    }
}

function showAlert(message, type) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    helperModule.showAlert(message, type, alertPlaceholder);
}

async function updateTicketOnChange(idTicket, username, changed, tokens) {
    const titleElement = document.getElementById('title');
    const typeSelect = document.getElementById('type');
    const urgencySelect = document.getElementById('urgency');
    const difficultyElement = document.getElementById('difficulty');
    const notesElement = document.getElementById('notes');
    const descriptionElement = document.getElementById('description');

    const ticket = {
        id: idTicket,
        title: titleElement.value,
        typeId: typeSelect[typeSelect.selectedIndex].id,
        urgency: urgencySelect[urgencySelect.selectedIndex].value,
        difficulty: difficultyElement.value,
        description: descriptionElement.value,
        notes: notesElement.value,
        changed,
        username
    };

    await updateTicket(ticket, tokens);
}

async function createComment(idTicket, username, tokens) {
    const commentElement = document.getElementById('newComment');
    const comment = commentElement.value.trim();

    if(comment != '') {
        const response = await ticketDB.createCardComment(idTicket, username, comment, tokens);

        if(response.status == 201) {
            const ticket = response.ticket;

            setCommentsHTML(ticket.comments);
            setLogsHTML(ticket.logs);
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

global.window.fetchTicketDetails = fetchTicketDetails;
global.window.updateTicketToDo = updateTicketToDo;
global.window.updateTicketInProgress = updateTicketInProgress;
global.window.updateTicketDone = updateTicketDone;
global.window.updateTicket = updateTicket;
global.window.assignTicket = assignTicket;
global.window.unassignTicket = unassignTicket;
global.window.showAlert = showAlert;
global.window.createComment = createComment;
global.window.setNavBarAdmin = setNavBarAdmin;

function setCommentsHTML(commentsList) {
    const commentsArea = document.getElementById('comment-cards');
    let comments = ``;

    for(const comment of commentsList) {
        const username = comment.user.username;
        const text = comment.text;
        const date = new Date(comment.commentDate);

        const commentBody = `
            <div class="card" style="width: 100%">
                <div class="card-body">
                    <h5 class="card-title">User: ${username}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getSeconds()}</h6>
                    <p class="card-text">${text}</p>
                </div>
            </div>
        `;

        comments = comments.concat(commentBody);
    }
    commentsArea.innerHTML = comments;
}

function setLogsHTML(logsList) {
    const logsArea = document.getElementById('log-cards');
    let logs = ``;

    for(const log of logsList) {
        const username = log.user.username;
        const text = log.text;
        const date = new Date(log.logDate);

        const logBody = `
            <div class="card" style="width: 100%">
                <div class="card-body">
                    <h5 class="card-title">User: ${username}</h5>
                    <h6 class="card-title">${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getSeconds()}</h6>
                    <p class="card-text">${text}</p>
                </div>
            </div>
        `;

        logs = logs.concat(logBody);
    }
    logsArea.innerHTML = logs;
}

async function setTicketDetails(ticket) {
    const titleElement = document.getElementById('title');
    const notesElement = document.getElementById('notes');
    const difficultyElement = document.getElementById('difficulty');
    const statusElement = document.getElementById('status');
    const descriptionElement = document.getElementById('description');

    const publisherElement = document.getElementById('publisher');
    const assignedElement = document.getElementById('assigned');

    titleElement.value = ticket.title;
    await fillTypes(idOrg, ticket.id, tokens);
    fillUrgencyTypes();
    notesElement.value = ticket.notes;
    difficultyElement.value = ticket.difficulty;
    statusElement.value = ticket.status;
    descriptionElement.value = ticket.description;

    const publisher = ticket.publisher;
    publisherElement.value = publisher.username;

    const assigned = ticket.assigned;
    if(assigned != null) {
        assignedElement.value = assigned.username;
    }

    if(assigned != null && assigned.username == username) {
        document.getElementById('unassign').disabled = false;
    } else {
        document.getElementById('assign').disabled = false;
    }
}