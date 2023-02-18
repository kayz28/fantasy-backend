const ErrorFactory = require("../error/ErrorFactory");
const db = require("../models/index");
const httpCodes = require("http-codes");
const CricketTeamAdaptor = require("../adaptors/CricketAdaptor");
const PlayerRepository = require("../repository/redis/PlayerRepository");
const redis = require("../models/redis/index");


class CricketTeamService {

    constructor() {
        this.teamplayers = 11;
    }

    async _init() {
        const client = await redis.redisClient.getRedisClient();
        this.playerRepository = await new PlayerRepository().create(client, redis.Players);
    }

    async create() {
        const obj = new CricketTeamService();
        await obj._init();
        return obj;
    }

    createTeam = async (body) => {
        // try {
            //check if contest is joined
            //then only team create
            CricketTeamAdaptor.validateUserTeam(body);
            var playerIds = body.playersIds;
            delete body.playersIds;
            Object.assign(body, playerIds);
            var data = {};
            data = await db.n_d11_cricket_contest_logs.create(body)
                    .then((result) => {
                            return {
                                status: httpCodes.CREATED, 
                                message: "Created the user team.", 
                                result: result.id
                            };
                    }).catch((err) => {
                           return {
                            status: httpCodes.INTERNAL_SERVER_ERROR, 
                            message: "Error while creating user team.", 
                            error: err
                        };
                    });
                
            if(data.status === httpCodes.INTERNAL_SERVER_ERROR) {
                throw ErrorFactory("ServerError", data.message, data.error);
            }
            return data;
        }

    getUserTeam = async (user_id, contest_id, user_team_id) => {
            const data = await db.n_d11_cricket_contest_logs.findOne({
                where: {
                    user_id: user_id,
                    contest_team_id: user_team_id,
                    contest_id: contest_id
                }
            }).then((result) => {
                return {
                    status: httpCodes.ACCEPTED, 
                    message: "Found the result", 
                    team_data: result
                };
            }).catch((err) => {
                return {
                    status: httpCodes.INTERNAL_SERVER_ERROR,
                    message: "Error while getting the user team.", 
                    error: err
                };
            });

            if(data.status === 500) {
                throw ErrorFactory("ServerError", data.message, data.error);
            }
            return data;
    }

    updateUserTeam = async (user_id, contest_id, user_team_id, team, category) => {
        const set = new Set(Object.values(team));
        var data = {};
        if(category === 'CRICKET' && set.size === 11)
        {
           data = db.n_d11_cricket_contest_logs.update({
            p1: team.p1,p2: team.p2,p3: team.p3,p4: team.p4,
            p5: team.p5,p6: team.p6,p7: team.p7,p8: team.p8,
            p9: team.p9,p10: team.p10,p11: team.p11
           },
            {
                where: {
                    user_id: user_id,
                    contest_team_id: user_team_id,
                    contest_id: contest_id
                }
           }).then((result) => {
                console.debug("Updated the team with user id " + user_id);
                return {
                    status: 200, 
                    message: "Updated the team.", 
                    result:result.id
                };
           }).catch((err) => {
                console.debug(err);
                return {
                    status: 500, 
                    message: "Internal Server Error"
                };
           });
           return data;
        } else {
            throw ErrorFactory("BadRequestError", "Validation failed for team id's passed. please check and try again");
        }

    }

    getMatchTeams = async(match_id, category) => {        
        const cache = await this.playerRepository.findAllBymatchId(match_id, category)
        .then((result) => {
            return {
                status: httpCodes.ACCEPTED,
                message: "Got the team members from cache.",
                result: result,
                type: typeof(result)
            }
        }).catch(err => {
            return {
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
                error: err
            }
        });

        if(cache.status === httpCodes.INTERNAL_SERVER_ERROR || !("result" in cache) || cache.result.length === 0) {

        const data = await db.n_d11_player_infos.findAll({
            where: {
                match_id: match_id,
                player_sub_category: category
            }
        }).then((result) => {
            return {
                status: httpCodes.ACCEPTED,
                message: "Got the team members.",
                result: result
            }
        }).catch((err) => {
            return {
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
                error: err
            }
        });
        
        if(data.status === httpCodes.INTERNAL_SERVER_ERROR)
            throw ErrorFactory("ServerError", data.message, data.error);

        var cacheFirstTimeData = [];
        var failCount = 0;
        var passCount = 0;
        var failIds = [];

        for(let i=0;i<data.result.length;i++) {
            var flagForFail = false;
            const list = await this.playerRepository
            .createAndSave(data.result[i])
            .then(result => {
                passCount+=1;
                return result;
            }).catch(err => {
                failIds.push(data.result[i].id);
                failCount+=1;
                flagForFail = true;
                return err;
            });

            if(!flagForFail)
                cacheFirstTimeData.push(list);
        }
        
        if(cacheFirstTimeData.length === data.result.length && data.result.length === failCount && failCount!=0)
            throw ErrorFactory("ServerError", "Internal Server Error", cacheFirstTimeData[0])

        var cacheFirstTimeDataObj = {};
        cacheFirstTimeDataObj.status = httpCodes.ACCEPTED;
        cacheFirstTimeDataObj.cacheRes = cacheFirstTimeData;
        cacheFirstTimeDataObj.pass = passCount;
        cacheFirstTimeDataObj.fail = failCount;
        cacheFirstTimeDataObj.failIds = failIds;
        cacheFirstTimeDataObj.message = "Got the team members and updated the cache."
        return cacheFirstTimeDataObj;
        
    }
    
        return cache;
    }






}

module.exports = CricketTeamService;