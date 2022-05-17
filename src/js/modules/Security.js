const axios = require("axios");

async function requestRegister(registerData) {
    const url = 'http://localhost:8080/security/organisation/register';
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
                response = {
                    status: resp.status,
                    accessToken: resp.data.access_token,
                    refreshToken: resp.data.refresh_token
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
                console.log(resp);
                response = {
                    status: resp.status,
                    accessToken: resp.data.access_token,
                    refreshToken: resp.data.refresh_token
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
    if(typeof tokens === 'undefined' || tokens == null) return null;
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
                console.log(resp);
                response = tokens;
            })
            .catch(function (err) {
                console.log(err);
                if(err.response.data.error_message.includes('The Token has expired')) {
                    response = null;
                }
            });
    } catch(e) {
        response = null;
    }

    if(response == null) {
        response = requestTokenRefresh(token.refreshToken);
        if(response.status != 200) {
            response = null;
        } else {
            response = {
                accessToken: response.accessToken,
                refreshToken: response.refreshToken
            }
        }
    }

    return response;
}

module.exports.requestLogin = requestLogin;
module.exports.requestRegister = requestRegister;
module.exports.requestTokenRefresh = requestTokenRefresh;
module.exports.ping = ping;