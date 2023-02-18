class BadRequestError extends Error {
    constructor(status, 
    message, 
    description = 'Bad Request') {
        super(message);
        this.status = status;
        this.message = message;
        this.description = description;
    }

    get getMessage() {
        return this.message;
    }

    get getStatus() {
        return this.status;
    }

    get getDescription() {
        return this.description;
    }
}

module.exports = BadRequestError;
