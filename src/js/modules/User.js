const axios = require("axios");
const securityModule = require("./Security.js");

async function redirectToLogin(tokens) {
    const pingResult = await securityModule.ping(tokens);
    if(pingResult == null) {
        global.window.location.replace("Login.html");
        return false;
    } else {
        global.window.sessionStorage.setItem('accessToken', pingResult.accessToken);
        global.window.sessionStorage.setItem('refreshToken', pingResult.refreshToken);
        return pingResult;
    }
}

async function getMainPageDetails(username, tokens) {
    tokens = await redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/user/main/organisation/${username}`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        await axios
            .get(url, config)
            .then(function (resp) {
                console.log(resp);
                const organisation = {
                    id: resp.data.id,
                    name: resp.data.name,
                    sign: resp.data.sign,
                    dateCreated: resp.data.dateCreated,
                    domain: resp.data.domain,
                    cui: resp.data.cui
                };
                const departments = resp.data.departments;

                response = {
                    status: resp.status,
                    organisation,
                    departments
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

        return response;
    }
}

module.exports.getMainPageDetails = getMainPageDetails;