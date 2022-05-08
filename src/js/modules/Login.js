const axios = require("axios");

async function requestLogin(user, pass) {
    const data = {
        username: user,
        password: pass
    };
    const url = 'http://localhost:8080/security/login';
    let response;

    /*axios
        .get('http://localhost:8080/security/account/all', {
            headers: {
                'Authorization': 'Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2JlcnRwb3AiLCJyb2xlcyI6WyJBRE1JTiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvc2VjdXJpdHkvbG9naW4iLCJleHAiOjE2NTE5NTMwNzN9.iWbGz8INP-CSKzI5_R_s76ghq5VRNZG6MACeC-I_RPU'
            }
        }).then(function (resp) {
        console.log(resp);
    }).catch(function (err) {
        console.log(err);
    });*/


    await axios
        .post(url, data)
        .then(function (resp) {
            response = {
                status: resp.status,
                accessToken: resp.data.access_token,
                refreshToken: resp.data.refresh_token
            }
            axios.defaults.headers.common['Authorization'] = `Token: ${response.accessToken}`;
        })
        .catch(function (err) {
            response = {
                status: err.response.status,
                message: err.message
            }
        });

    return response;
}

module.exports.requestLogin = requestLogin;