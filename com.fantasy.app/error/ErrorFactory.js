const ErrorTypes = require("../error/ErrorTypes");
const BadRequestError = require("../error/BadRequestError");
const ServerError = require("../error/ServerError");
const ThirdPartyApiError = require("../error/ThirdPartyApiError")
const StatusMappings = require("../error/ErrorMappings");

const ErrorFactory = (type, message, error) => {
    switch (type) {
        case ErrorTypes.BAD_REQUEST : return new BadRequestError(StatusMappings.BAD_REQUEST.status, message, error);
        case ErrorTypes.SERVER_ERROR : return new ServerError(StatusMappings.INTERNAL_SERVER_ERROR.status, message, error);
        case ErrorTypes.THIRD_PARTY_API : return new ThirdPartyApiError(StatusMappings.INTERNAL_SERVER_ERROR.status, 
            message, error);
    }
}

module.exports = ErrorFactory;