const { Repository } = require("redis-om");

class PlayerRepository extends Repository {
    constructor(client, schema) {
        super(client, schema);
    }

    async _init(client, schema) {
        this.repository = await client.fetchRepository(schema);
        await this.repository.createIndex();
    }

    async create(client, schema) {
        const obj = new PlayerRepository(client, schema);
        obj._init(client, schema);
        return obj;
    }

    async findAllBymatchId(matchId, category) {
        return await this.repository.search()
        .where('match_id').equals(matchId)
        .and('category').equals(category).return.all();
    }

    async createAndSave(obj) {
        return await this.repository.createAndSave(obj);
    }

    async createAndSaveArr(obj) {
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

module.exports = PlayerRepository;