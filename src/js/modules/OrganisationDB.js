const axios = require("axios");
const helperModule = require("./Helper.js");

async function registerOrganisation(registerData) {
    const url = 'http://localhost:8080/organisation/main';
    let response;

    try {
        await axios
            .post(url, registerData)
            .then(function (resp) {
                response = {
                    status: resp.status
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
            status: 900,
            message: err.message,
            serverMessage: 'Internal error'
        }
    }


    return response;
}

async function getOrganisationByUsername(username, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/organisation/main/${username}`;
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

async function createType(type, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/organisation/type`;
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        }
        let response;

        try {
            await axios
                .post(url, type, config)
                .then(function (resp) {
                    console.log(resp);
                    const type = {
                        id: resp.data.id,
                        name: resp.data.name,
                        idOrganisation: resp.data.idOrganisation
                    };

                    response = {
                        status: resp.status,
                        type
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

async function getTypes(idOrg, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/organisation/type/${idOrg}`;
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
                    console.log(resp);
                    const types = resp.data;

                    response = {
                        status: resp.status,
                        types
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

module.exports.registerOrganisation = registerOrganisation;
module.exports.getOrganisationByUsername = getOrganisationByUsername;
module.exports.createType = createType;
module.exports.getTypes = getTypes;
