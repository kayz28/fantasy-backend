const ErrorCodes = require('./ErrorMappings');

class ServerError extends Error {
    constructor(status = ErrorCodes.INTERNAL_SERVER_ERROR.status, 
    message = 'Error while processing the request internally.', 
    description = ErrorCodes.INTERNAL_SERVER_ERROR.message) {
        super(status, message);
        this.status = status;
        this.message = message;
        this.description = description;
    }

    get getStatus() {
        return this.status;
    }

    get getMessage() {
        return this.message;
    }

    get getDescription() {
        return this.description;
    }

}

module.exports = ServerError;
