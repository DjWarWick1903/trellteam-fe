const axios = require("axios");
const qs = require('qs');

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

function login(user, pass) {
    //const username = document.getElementById('username');
    //const password = document.getElementById('password');
    const isValid = false;
    const data = {
        username: user,
        password: pass
    };
    const url = 'http://localhost:8080/security/login';
    //const url = 'http://localhost:8080/security/account/all';
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            //'Access-Control-Allow-Origin': '*'},
        data: qs.stringify(data),
        url
    };
//onsubmit="return login(this)"

    axios
        .get('http://localhost:8080/security/account/all', data, {
            headers: {
                'Authorization': 'Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2JlcnRwb3AiLCJyb2xlcyI6WyJBRE1JTiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvc2VjdXJpdHkvbG9naW4iLCJleHAiOjE2NTE5NDg3MjB9.mMNmsWjH2EDy7lYVqPFQFR_8AF4xFBPBpkP-MVKtuDI'
            }
        }).then(function (resp) {
        console.log(resp);
    }).catch(function (err) {
        console.log(err);
    });

    /*axios
        .get('http://localhost:8080/security/login/test', new URLSearchParams({
            username: user,
            password: pass
        }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
        console.log(resp);
    }).catch(function (err) {
        console.log(err);
    });*/

    /*axios
        .get('http://localhost:8080/security/login',
            qs.stringify({
                username: user,
                password: pass
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                console.log(resp);
        }).catch(function (err) {
            console.log(err);
    });*/
    /*axios(options)
        .then(res => {console.log(res); isValid = true;})
        .catch(err => console.log(err));*/
    return isValid;
}

module.exports.login = login;