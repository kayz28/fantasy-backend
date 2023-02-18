const axios = require('axios');
const cricketApiInfo = require("../constants/ScheduledApiConstant");
const payloadutil = require("../utils/createApiRequest");
const db = require("../models/index");
const { Op, DatabaseError } = require("sequelize");
const ErrorFactory = require("../error/ErrorFactory");
const redis = require("../models/redis/index");
const PlayerRepository = require("../repository/redis/PlayerRepository");

const headers = {
    'X-RapidAPI-Key' : cricketApiInfo.CRICKET_API_KEY,
    'X-RapidAPI-Host' : cricketApiInfo.CRICKET_API_HOST
};


const ScheduledService = {

    createLeague : async () => {
        const options = payloadutil('GET', cricketApiInfo.CRICKET_SERIES_TYPE_API, headers);
        const data = await axios.request(options).then(function (response) {
            const data = response.data.seriesMapProto;
            const leaguesData = [];
            for(let i = 0;i<data.length; i++) {
                const leagueobj = {};
               for(let j = 0; j<data[i].series.length; j++) {
                leagueobj.series_id = data[i].series[j].id;
                leagueobj.name = data[i].series[j].name;
                leagueobj.start_date = new Date(Number(data[i].series[j].startDt));
                leagueobj.end_date = new Date(Number(data[i].series[j].endDt));
                leagueobj.duration_in_days = Math.ceil((leagueobj.end_date - leagueobj.start_date) / (1000 * 60 * 60 * 24));
                leagueobj.category = cricketApiInfo.CATEGORY_CRICKET;
                leagueobj.rating = 0;
                leagueobj.number_of_teams = 0;
                leagueobj.league_type = 'league';
               }
               leaguesData.push(leagueobj);  
            } 
            return leaguesData;
        }).catch(() => {
            throw ErrorFactory("ThirdPartyApiError", "Error while hitting cricbuzz api.");
        });
        const result = await db.n_d11_leagues_infos.bulkCreate(data, {
            validate: true,
            raw: true
        }).then((result) => {
            const resultJson = JSON.stringify(result);
            const array = JSON.parse(resultJson);
            const resultIds = [];
            for(let i=0;i<array.length;i++) {
                resultIds.push(array[i].id);
            }
            return resultIds;
        }).catch(() => {
            throw new ErrorFactory("ServerError", "Error while creating leagues.");
        });
        return {'status': 200, 'bulkCreateIds': result};
    },

    updateLeagueMatchCreated: async (seriesId) => {
        const data = await db.n_d11_leagues_infos.update({match_created: 1},{
            where : {
                seriesId: seriesId
            }
        }).then((result) => {
            return {status: 200, data: result};
        }).catch((err) => {
            throw err;   
                     
        });
        return data;
    },

    getLeagueSeriesIds: async () => {
        const data = await db.n_d11_leagues_infos.findOne({
            where : {
                match_created : 0
            }, raw: true
        }).then((result) => {
            return {status: 200, data:result};
            
        }).catch((err) => {
            throw err;
        });

        if(data === null)
        throw ErrorFactory("BadRequestError", "No seriesId present for match creation");
        
        return data;
    }, 

    createLeagueMatches : async (id, seriesId, category) => {
       //todo get id's of leagues

        const options = payloadutil('GET', cricketApiInfo.CRICKET_SERIES_API + seriesId, headers);
        var matchDetails = [];
        const data = await axios.request(options).then(function (response) {
            if(response.data === null || response.data.length === 0 ) {
                throw ErrorFactory("BadRequestError", "No content present while hitting third party");
            }
            const resp = response.data.matchDetails;
            for(let i=0; i<resp.length; i++) {
             if("matchDetailsMap" in resp[i]) {
               const matchDetail = resp[i].matchDetailsMap.match[0].matchInfo;
               const matchObj = {};
               matchObj.name = matchDetail.seriesName;
               matchObj.team1 = matchDetail.team1.teamName;
               matchObj.api_team1_id = matchDetail.team1.teamId;
               matchObj.api_team2_id = matchDetail.team2.teamId;
               matchObj.api_match_id = matchDetail.matchId;
               matchObj.team2 = matchDetail.team2.teamName;
               matchObj.start_date = new Date(Number(matchDetail.startDate));
               matchObj.end_date = new Date(Number(matchDetail.endDate));
               matchObj.venue = matchDetail.venueInfo.ground;
               matchObj.category = category;
               matchObj.match_country = matchDetail.venueInfo.city;
               matchObj.state = matchDetail.state;
               matchObj.match_format = matchDetail.matchFormat;
               matchObj.match_duration_in_hrs = Math.ceil((matchObj.end_date - matchObj.start_date) / (1000 * 60 * 60));
               matchObj.match_id = matchDetail.matchId;
               matchObj.league_id = id;
               matchDetails.push(matchObj);
            }
        }
            return matchDetails;
        }
        ).catch(() => {
            throw ErrorFactory("ServerError", "Error while hitting 3rd party api.");
        });
        if(data.status == 500)
            return data;
        if(data.length == 0)
        throw ErrorFactory("BadRequestError", "No matches present for the series.");
        const resultdata = await db.n_d11_matches_infos.bulkCreate(data).then((result) => {
            return {status: 200, matches: result};
        }).catch((err) => {
            console.log(err);
            throw ErrorFactory("ServerError", "Error while bulk create for the matches.");
        });
        return resultdata;
    },

    createPlayer : () => {

    },

    createSquadSeriesRelation: async (seriesId) => {
        const options = payloadutil('GET', cricketApiInfo.CRICKET_SERIES_API + seriesId + '/squads', headers);

        const data = await axios.request(options).then((result) => {
            result = result.data;
            if(!("squads" in result))
                return {status : 400 , message: "Invalid series id", result: result};

            var relationsDetails = [];
            const squadsList = result.squads;
            for(let i=0; i<squadsList.length; i++) {
                const squadRelationObj = {};
                if("squadId" in squadsList[i] && "teamId" in squadsList[i]) {
                    squadRelationObj.api_squad_id = squadsList[i].squadId;
                    squadRelationObj.api_team_id = squadsList[i].teamId;
                    squadRelationObj.api_series_id = seriesId;
                    relationsDetails.push(squadRelationObj);
                }
            }
            return relationsDetails;
            
        }).catch((err) => {
            console.log(err);
            return {status: 500, message: "Internal server error"};            
        });

        if("status" in data)
        return data;
        const result = await db.n_d11_squad_team_series_relation.bulkCreate(data).then((result) => {
            return {status : 200, result : result.id}
        }).catch((err) => {
            console.log(err);
            return {status: 500, result: "Internal Server Error"};
        });

        return result;

    }, 

    getSquadIdForTeam : async(seriesId, teamId) => {
        const data = await db.n_d11_squad_team_series_relation.findOne({
            where: {
                api_series_id : seriesId,
                api_team_id: teamId
            }
        }).then((result) => {
            return {status: 200, data: result};
        }).catch((err) => {
            console.log(err);
            return {status: 500, message: "Internal server error"};
        });
        return data;
    },

    //not api match id here we want to create relation
    //separate gets and creates

    //filter to be added to tackle bulkcreate
    //get relation on seriesid bulkcreate on remaning
    //locha hai iss api todo future integerate it with createPlayerfromsquad

    getSquadList : async (squadId, seriesId) => {
        // todo convert it in class
        // make a constructor and init function
        const options = payloadutil('GET', cricketApiInfo.CRICKET_SERIES_API + seriesId + '/squads/' + squadId, headers);
        const data = await axios.request(options).then((result) => {
            result.data.squadId = squadId;
            result.data.seriesId = seriesId;
            return {status: 200, data: result.data};
        }).catch((err) => {
            console.log(err);
            return {status: 500, message : "Internal server error"};
            
        });
        return data;
    },

    createPlayersFromSquad : async (data) => {
        const playersData = data.player;
        const refinedPlayersData = [];
        for(let i=0;i<playersData.length; i++) {
            const player = {};
            if(!('isHeader' in playersData[i])){
            player.api_player_id = playersData[i].id;
            player.name = playersData[i].name;
            player.role = playersData[i].role;
            player.player_sub_category = "CRICKET";
            player.api_series_id = data.seriesId;
            player.api_squad_id = data.squadId;
            player.match_id = data.matchId;
            refinedPlayersData.push(player);
            }
        }
        return await db.n_d11_player_infos.bulkCreate(refinedPlayersData).then((result) => {
            return {status: 200, message:'created squad', result: result};
        }).catch((err) => {
            console.log(err);
            return {status: 500, message:'Internal server error.'};
        });
        
    }

}

module.exports = ScheduledService;
