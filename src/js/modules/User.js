const axios = require("axios");
const securityModule = require("./Security.js");
const helperModule = require('./Helper.js');

async function getOrganisation(username, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/user/main/organisation/${username}`;
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

async function getOrganisationEmployees(idOrg, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/user/main/organisation/employees/${idOrg}`;
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
                    const employees = resp.data;

                    response = {
                        status: resp.status,
                        employees
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

async function createDepartment(idOrganisation, departmentName, idManager, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/user/main/organisation/department`;
        const data = {
            depName: departmentName,
            idOrg: idOrganisation,
            idMan: idManager
        };
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        let response;

        try {
            await axios
                .post(url, data, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status,
                        department: resp.data.department
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

async function createEmployee(account, employee, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/user/main/organisation/employee`;
        const data = {
            account,
            employee
        };
        const config = {
            headers: {
                'Authorization': `Token: ${tokens.accessToken}`
            }
        };
        let response;

        try {
            await axios
                .post(url, data, config)
                .then(function (resp) {
                    console.log(resp);
                    response = {
                        status: resp.status,
                        department: resp.data.response
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

async function getAccountDetails(username, tokens) {
    tokens = await helperModule.redirectToLogin(tokens);

    if(tokens != false) {
        const url = `http://localhost:8080/user/main/organisation/account/${username}`;
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

module.exports.getOrganisation = getOrganisation;
module.exports.getOrganisationEmployees = getOrganisationEmployees;
module.exports.createDepartment = createDepartment;
module.exports.createEmployee = createEmployee;
module.exports.getAccountDetails = getAccountDetails;