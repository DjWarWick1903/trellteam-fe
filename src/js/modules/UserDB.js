const axios = require("axios");
const helperModule = require('./Helper.js');

async function getAccountDetails(username, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/user/main/account/${username}`;
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
                        username: resp.data.username,
                        email: resp.data.email,
                        dateCreated: resp.data.dateCreated,
                        employee: resp.data.employee,
                        roles: resp.data.roles
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

module.exports.getAccountDetails = getAccountDetails;