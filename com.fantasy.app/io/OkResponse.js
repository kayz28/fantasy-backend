class OkResponse {
    constructor(status, data, message) {
        this.status = status;
        this.data = data;
        this.message = message
    }

    setStatus(status) {
        this.status = status | 200;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    build() {
        return new OkResponse(this.status, this.data, this.message);
    }

}

module.exports = OkResponse;