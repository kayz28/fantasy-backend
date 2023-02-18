const StatusMapping = {
    OK : {
        message : "OK",
        status : 200
    },
    CREATED : {
        message : "Created",
        status : 201
    },
    ACCEPTED : {
        message : "Accepted",
        status : 202
    },
    NO_CONTENT : {
        message : "No Content",
        status : 204
    },
    BAD_REQUEST : {
        message : "Bad Request",
        status : 400
    },
    UNAUTHORIZED : {
        message : "Unauthorized",
        status : 401
    },
    NOT_FOUND : {
        message : "NOT_FOUND",
        status: 404
    },
    INTERNAL_SERVER_ERROR : {
        message : "Internal Server Error",
        status: 500
    }

}

module.exports = StatusMapping;