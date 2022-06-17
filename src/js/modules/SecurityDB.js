const axios = require("axios");
const helperModule = require("./Helper");

async function requestLogin(user, pass) {
    const data = {
        username: user,
        password: pass
    };
    const url = 'http://localhost:8080/security/login';
    let response;

    try {
        await axios
            .post(url, data)
            .then(function (resp) {
                console.log(resp);
                response = {
                    status: resp.status,
                    accessToken: resp.data.access_token,
                    refreshToken: resp.data.refresh_token,
                    roles: resp.data.roles
                };
                //axios.defaults.headers.common['Authorization'] = `Token: ${response.accessToken}`;
            })
            .catch(function (err) {
                response = {
                    status: err.response.status,
                    message: err.message,
                    serverMessage: err.response.data.error_message
                };
            });
    } catch(err) {
        response = {
            status: 900,
            message: err.message,
            serverMessage: 'Internal error.'
        };
    }

    return response;
}

async function requestTokenRefresh(refreshToken) {
    const url = 'http://localhost:8080/security/token/refresh';
    const config = {
        headers: {
            'Authorization': `Token: ${refreshToken}`
        }
    }
    let response;

    try {
        await axios
            .get(url, config)
            .then(function (resp) {
                response = {
                    status: resp.status,
                    accessToken: resp.data.access_token,
                    refreshToken: resp.data.refresh_token
                }
            })
            .catch(function (err) {
                response = {
                    status: err.response.status,
                    message: err.message,
                    serverMessage: err.response.data.error_message
                }
            });
    } catch(e) {
        response = {
            status: 900,
            message: e.message,
            serverMessage: 'Internal error.'
        }
    }

    return response;
}

async function ping(tokens) {
    if(tokens == null) return null;
    const url = 'http://localhost:8080/security/ping';
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
                response = tokens;
            })
            .catch(function (err) {
                if(err.response.data.error_message.includes('The Token has expired')) {
                    response = null;
                }
            });
    } catch(e) {
        response = 'Internal error.';
    }

    if(response == null) {
        response = await requestTokenRefresh(token.refreshToken);
        if(response.status != 200) {
            response = null;
        } else {
            response = {
                accessToken: response.accessToken,
                refreshToken: response.refreshToken
            }
        }
    } else if(response == 'Internal error.') {
        response = null;
    }

    return response;
}

async function getRoles(tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/security/role`;
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
                    response = {
                        status: resp.status,
                        roles: resp.data
                    }
                })
                .catch(function (err) {
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

module.exports.requestLogin = requestLogin;
module.exports.requestTokenRefresh = requestTokenRefresh;
module.exports.ping = ping;
module.exports.getRoles = getRoles;