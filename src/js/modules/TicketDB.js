const axios = require("axios");
const helperModule = require("./Helper.js");

async function createTicket(ticket, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/card/main`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        try {
            await axios
                .post(url, ticket, config)
                .then(function (resp) {
                    response = {
                        status: resp.status,
                        ticket: resp.data
                    }
                })
                .catch(function (err) {
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch(err) {
            response = {
                status: 404,
                message: err.message,
                serverMessage: 'Server could not be reached'
            }
        }

        return response;
    }
}

async function getTicket(idTicket, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/card/main/${idTicket}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        try {
            await axios
                .get(url, config)
                .then(function (resp) {
                    const ticket = {
                        id: resp.data.id,
                        title: resp.data.title,
                        difficulty: resp.data.difficulty,
                        description: resp.data.description,
                        notes: resp.data.notes,
                        status: resp.data.status,
                        publisher: resp.data.publisher,
                        assigned: resp.data.assigned,
                        type: resp.data.type
                    }
                    response = {
                        status: resp.status,
                        ticket
                    }
                })
                .catch(function (err) {
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch(err) {
            response = {
                status: 404,
                message: err.message,
                serverMessage: 'Server could not be reached'
            }
        }

        return response;
    }
}

function getUrgencyTypes() {
    const low = { id: 1, name: 'Low'};
    const medium = { id: 2, name: 'Medium'};
    const high = { id: 3, name: 'High'};
    const vHigh = { id: 4, name: 'Very High'};

    const types = [low, medium, high, vHigh];
    return types;
}

async function updateTicketInToDo(idTicket, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/card/main/todo/${idTicket}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        try {
            await axios
                .put(url, null, config)
                .then(function (resp) {
                    const ticket = {
                        id: resp.data.id,
                        title: resp.data.title,
                        difficulty: resp.data.difficulty,
                        description: resp.data.description,
                        notes: resp.data.notes,
                        status: resp.data.status,
                        publisher: resp.data.publisher,
                        assigned: resp.data.assigned,
                        type: resp.data.type
                    }
                    response = {
                        status: resp.status,
                        ticket
                    }
                })
                .catch(function (err) {
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch(err) {
            response = {
                status: 404,
                message: err.message,
                serverMessage: 'Server could not be reached'
            }
        }

        return response;
    }
}

async function updateTicketInProgress(idTicket, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/card/main/progress/${idTicket}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        try {
            await axios
                .put(url, null, config)
                .then(function (resp) {
                    const ticket = {
                        id: resp.data.id,
                        title: resp.data.title,
                        difficulty: resp.data.difficulty,
                        description: resp.data.description,
                        notes: resp.data.notes,
                        status: resp.data.status,
                        publisher: resp.data.publisher,
                        assigned: resp.data.assigned,
                        type: resp.data.type
                    }
                    response = {
                        status: resp.status,
                        ticket
                    }
                })
                .catch(function (err) {
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch(err) {
            response = {
                status: 404,
                message: err.message,
                serverMessage: 'Server could not be reached'
            }
        }

        return response;
    }
}

async function updateTicketInDone(idTicket, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/card/main/done/${idTicket}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        try {
            await axios
                .put(url, null, config)
                .then(function (resp) {
                    const ticket = {
                        id: resp.data.id,
                        title: resp.data.title,
                        difficulty: resp.data.difficulty,
                        description: resp.data.description,
                        notes: resp.data.notes,
                        status: resp.data.status,
                        publisher: resp.data.publisher,
                        assigned: resp.data.assigned,
                        type: resp.data.type
                    }
                    response = {
                        status: resp.status,
                        ticket
                    }
                })
                .catch(function (err) {
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch(err) {
            response = {
                status: 404,
                message: err.message,
                serverMessage: 'Server could not be reached'
            }
        }

        return response;
    }
}

async function updateTicket(ticket, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/card/main`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        try {
            await axios
                .put(url, ticket, config)
                .then(function (resp) {
                    const ticket = {
                        id: resp.data.id,
                        title: resp.data.title,
                        difficulty: resp.data.difficulty,
                        description: resp.data.description,
                        notes: resp.data.notes,
                        status: resp.data.status,
                        publisher: resp.data.publisher,
                        assigned: resp.data.assigned,
                        type: resp.data.type
                    }
                    response = {
                        status: resp.status,
                        ticket
                    }
                })
                .catch(function (err) {
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch(err) {
            response = {
                status: 404,
                message: err.message,
                serverMessage: 'Server could not be reached'
            }
        }

        return response;
    }
}

async function assignTicket(idTicket, username, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/card/assign`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;
        const data = {
            id: idTicket,
            user: username
        };

        try {
            await axios
                .put(url, data, config)
                .then(function (resp) {
                    const ticket = {
                        id: resp.data.id,
                        title: resp.data.title,
                        difficulty: resp.data.difficulty,
                        description: resp.data.description,
                        notes: resp.data.notes,
                        status: resp.data.status,
                        publisher: resp.data.publisher,
                        assigned: resp.data.assigned,
                        type: resp.data.type
                    }
                    response = {
                        status: resp.status,
                        ticket
                    }
                })
                .catch(function (err) {
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch(err) {
            response = {
                status: 404,
                message: err.message,
                serverMessage: 'Server could not be reached'
            }
        }

        return response;
    }
}

async function unassignTicket(idTicket, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/card/unassign/${idTicket}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        try {
            await axios
                .put(url, null, config)
                .then(function (resp) {
                    const ticket = {
                        id: resp.data.id,
                        title: resp.data.title,
                        difficulty: resp.data.difficulty,
                        description: resp.data.description,
                        notes: resp.data.notes,
                        status: resp.data.status,
                        publisher: resp.data.publisher,
                        assigned: resp.data.assigned,
                        type: resp.data.type
                    }
                    response = {
                        status: resp.status,
                        ticket
                    }
                })
                .catch(function (err) {
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch(err) {
            response = {
                status: 404,
                message: err.message,
                serverMessage: 'Server could not be reached'
            }
        }

        return response;
    }
}

module.exports.createTicket = createTicket;
module.exports.getTicket = getTicket;
module.exports.getUrgencyTypes = getUrgencyTypes;
module.exports.updateTicketInToDo = updateTicketInToDo;
module.exports.updateTicketInProgress = updateTicketInProgress;
module.exports.updateTicketInDone = updateTicketInDone;
module.exports.updateTicket = updateTicket;
module.exports.assignTicket = assignTicket;
module.exports.unassignTicket = unassignTicket;