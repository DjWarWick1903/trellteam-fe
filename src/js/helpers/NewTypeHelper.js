const helperModule = require('../modules/Helper.js');
const organisationDB = require('../modules/OrganisationDB.js');

function verifyName(name) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(helperModule.verifyInputIsEmpty(name)) {
        helperModule.showAlert('Please specify the name of the new type.', 'info', alertPlaceholder);
        return false;
    }

    return true;
}

async function createType(type, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');

    if(verifyName(type.name)) {
        const response = await organisationDB.createType(type, tokens);

        if(response.status == 201) {
            helperModule.showAlert('Type successfully created.', 'success', alertPlaceholder);
            listTypes(type.idOrganisation, tokens);
            return;
        }

        helperModule.showAlert('Type could not be created because of a server error.', 'danger', alertPlaceholder);
    }
}

async function listTypes(idOrg, tokens) {
    const alertPlaceholder = document.getElementById('errorAlertPlaceholder');
    const response = await organisationDB.getTypes(idOrg, tokens);

    if(response.status == 200) {
        const types = response.types;
        const tableElement = document.getElementById('type-list');

        let bodyHTML = ``;
        for(const type of types) {
            const body = `
                <tr>
                    <th scope="row">${type.id}</th>
                    <td>${type.name}</td>
                </tr>
            `;
            bodyHTML = bodyHTML.concat(body);
        }

        tableElement.innerHTML = bodyHTML;
    } else {
        helperModule.showAlert('Types could not be fetched because of a server error.', 'danger', alertPlaceholder);
    }
}

global.window.createType = createType;
global.window.listTypes = listTypes;