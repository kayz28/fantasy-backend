const ErrorFactory = require("../error/ErrorFactory")


const CricketAdaptor = {
    
    validateUserTeam : (body) => {
        var playerIds = body.playersIds;
        var set = new Set(Object.values(playerIds));
        delete body.playersIds;
        Object.assign(body, playerIds);

        if(body.category != 'CRICKET' || set.size != 11) {
            throw ErrorFactory("BadRequestError", 
            "Validation failed: Team player id's are not unique.");
        }

        if(!set.has(body.vice_captain_id) || !set.has(body.captain_id)) {
            throw ErrorFactory("BadRequestError", 
            "Captain Id or Vice captain Id not present in playerId's. Please check");
        }

        if(body.vice_captain_id === body.captain_id) {
            throw ErrorFactory("BadRequestError", 
            "Validation failed: Captain-Id and Vice-Captain Id can not be same.");
        }

    },

    checkContestJoinedByUser : async() => {
        

    },

    filterByRole: async(body) => {


    }

}


module.exports = CricketAdaptor;