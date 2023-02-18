const { Repository } = require("redis-om");

class RedisBaseRepository extends Repository {
    constructor(client, schema) {
        super(client, schema);
        this.repository = (async() => await client.fetchRepository(schema));
        async() => await this.repository.createIndex();
    }

    async createAndSave(obj) {
        return await this.repository.createAndSave(obj);
    }

    async findAllByQuery(queryString) {
        return await this.repository.searchRaw(queryString).return.all();
    }

    async findOne(queryString) {
        return await this.repository.searchRaw(queryString).return.first();
    }

    async remove(entityId) {
        return await this.repository.remove(entityId);
    }

    async removeAll(...entityIds) {
        return await this.repository.remove(...entityIds);
    }
    
}

module.exports = RedisBaseRepository;