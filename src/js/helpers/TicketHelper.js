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

        document.getElementById('title').onchange = function () {updateTicketOnChange(idTicket, tokens)};
        document.getElementById('type').onchange = function () {updateTicketOnChange(idTicket, tokens)};
        document.getElementById('urgency').onchange = function () {updateTicketOnChange(idTicket, tokens)};
        document.getElementById('difficulty').onchange = function () {updateTicketOnChange(idTicket, tokens)};
        document.getElementById('notes').onchange = function () {updateTicketOnChange(idTicket, tokens)};
        document.getElementById('description').onchange = function () {updateTicketOnChange(idTicket, tokens)};
    } else {
        helperModule.showAlert("Ticket could not be fetched because of a server error.", "danger", alertPlaceholder);
    }
}

async function updateTicketToDo(idTicket, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.updateTicketInToDo(idTicket, tokens);

    if(response.status == 200) {
        helperModule.showAlert("Ticket moved in TO DO successfully.", "success", alertPlaceholder);
        document.getElementById('status').value = "TO DO";
    } else {
        helperModule.showAlert("Ticket could not be moved to TO DO because of a server error.", "danger", alertPlaceholder);
    }
}

async function updateTicketInProgress(idTicket, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.updateTicketInProgress(idTicket, tokens);

    if(response.status == 200) {
        helperModule.showAlert("Ticket moved to IN PROGRESS successfully.", "success", alertPlaceholder);
        document.getElementById('status').value = "IN PROGRESS";
    } else {
        helperModule.showAlert("Ticket could not be moved to IN PROGRESS because of a server error.", "danger", alertPlaceholder);
    }
}

async function updateTicketDone(idTicket, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.updateTicketInDone(idTicket, tokens);

    if(response.status == 200) {
        helperModule.showAlert("Ticket moved in DONE successfully.", "success", alertPlaceholder);
        document.getElementById('status').value = "DONE";
    } else {
        helperModule.showAlert("Ticket could not be moved to DONE because of a server error.", "danger", alertPlaceholder);
    }
}

async function updateTicket(ticket, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await ticketDB.updateTicket(ticket, tokens);

    if(response.status != 200) {
        helperModule.showAlert("Ticket could not be updated because of a server error.", "danger", alertPlaceholder);
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

async function updateTicketOnChange(idTicket, tokens) {
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
        notes: notesElement.value
    };

    updateTicket(ticket, tokens);
}

global.window.fetchTicketDetails = fetchTicketDetails;
global.window.updateTicketToDo = updateTicketToDo;
global.window.updateTicketInProgress = updateTicketInProgress;
global.window.updateTicketDone = updateTicketDone;
global.window.updateTicket = updateTicket;
global.window.assignTicket = assignTicket;
global.window.unassignTicket = unassignTicket;
global.window.showAlert = showAlert;