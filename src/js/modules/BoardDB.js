const helperModule = require("./Helper");
const axios = require("axios");

async function createBoard(board, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/board/main`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        let response;

        try {
            await axios
                .post(url, board, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status,
                        id: resp.data.id,
                        title: resp.data.title,
                        dateCreated: resp.data.dateCreated,
                        idDep: resp.data.idDepartment,
                        version: resp.data.version,
                        release: resp.data.release
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch (err) {
            response = {
                status: 900,
                message: err.message,
                serverMessage: 'Internal error.'
            }
        }

        return response;
    }
}

async function getDepartmentBoards(idDep, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/board/department/${idDep}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        let response;

        try {
            await axios
                .get(url, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status,
                        boards: resp.data
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    response = {
                        status: err.response.status,
                        message: err.message,
                        serverMessage: err.response.data.error_message
                    }
                });
        } catch (err) {
            response = {
                status: 900,
                message: err.message,
                serverMessage: 'Internal error.'
            }
        }

        return response;
    }
}

module.exports.createBoard = createBoard;
module.exports.getDepartmentBoards = getDepartmentBoards;