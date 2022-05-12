function showAlert(message, type, alertPlaceholder) {
    alertPlaceholder.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
}

function verifyInputIsEmpty(input) {
    if(input == null || input == '') {
        return true;
    }

    return false;
}

module.exports.showAlert = showAlert;
module.exports.verifyInputIsEmpty = verifyInputIsEmpty;