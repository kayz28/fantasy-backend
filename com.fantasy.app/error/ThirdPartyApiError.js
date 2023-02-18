class ThirdPartyApiError extends Error {
    constructor(status = 500, message = 'Error while hittting the 3rd party api.', 
    description = 'Internal Server Error') {
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

    getDescription() {
        return this.description;
    }
}

//want one module 
module.exports = ThirdPartyApiError;
