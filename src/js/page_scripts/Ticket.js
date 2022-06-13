const username = window.sessionStorage.getItem('username');
const idOrg = window.sessionStorage.getItem('orgId');
if(username == null || idOrg == null) window.location.replace("Login.html");
const tokens = {
    accessToken: window.sessionStorage.getItem('accessToken'),
    refreshToken: window.sessionStorage.getItem('refreshToken')
}

let idTicket = null;
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('id')) {
    idTicket = urlParams.get('id');
}

if(urlParams.has('assigned')) {
    const assigned = urlParams.get('assigned');
    if(assigned == 0) {
        window.showAlert("You have been unassigned from this ticket", "success");
    } else if(assigned == 1) {
        window.showAlert("You have been assigned to this ticket", "success");
    }
}

// make textarea hights progressive
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}

console.log(idTicket);
console.log(idOrg);
console.log(tokens);

// insert ticket data into inputs
window.fetchTicketDetails(idTicket, idOrg, username, tokens);

// page functionality
document.getElementById('todo').addEventListener('click', function() {
   window.updateTicketToDo(idTicket, tokens);
});

document.getElementById('progress').addEventListener('click', function() {
    window.updateTicketInProgress(idTicket, tokens);
});

document.getElementById('done').addEventListener('click', function() {
    window.updateTicketDone(idTicket, tokens);
});

document.getElementById('assign').addEventListener('click', function() {
    window.assignTicket(idTicket, username, tokens);
});

document.getElementById('unassign').addEventListener('click', function() {
    window.unassignTicket(idTicket, tokens);
});