//add entry in wallet transaction
//contest log entry

const db = require("../models/index");
const httpCodes = require("http-codes");
const ErrorFactory = require("../error/ErrorFactory");

const ContestJoinService = {

    createContest : async (entryFee, expectedSpots, totalWinnings) => {
        var thresholdSpots = totalWinnings/(expectedSpots)*(entryFee);
        //check for probabilities
        validateProbabilities(thresholdSpots);
        //make payload

        const result = await db.n_d11_contest_infos.create(body)
        .then((result) => {
            return {
                result: result,
                status: httpCodes.ACCEPTED,
                message: 'Created the contest'
            }
        }).catch((err) => {
            return {
                error: err,
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: 'Error while creating contest.'
            }
            
        });

        if(result.status === httpCodes.INTERNAL_SERVER_ERROR) {
            throw ErrorFactory(result.status, result.message, result.error);
        }
        return result;      
        
    },

    getMatchByCategory : async (category) => {
        const result = await db.n_d11_matches_infos.findAll({
            where : {
                category: category,
                state: 'Upcoming'
            },
            order : [
                'start_date'
            ]
        }).then((result) => {
            return {
                status: httpCodes.ACCEPTED,
                data: result,
                message: "Got the upcoming matches"
            }
        }).catch((err) => {
            return {
                status: httpCodes.INTERNAL_SERVER_ERROR,
                error: err,
                message: "Internal Server Error"
            }
        });

        if(result.status === httpCodes.INTERNAL_SERVER_ERROR) {
            throw ErrorFactory(result.status, result.message, result.error);
        }
        return result;
    },

    getContests : async (matchId) => {
        const result = await db.n_d11_contest_infos.findAll({
            where: {
                is_roundlocked: 0,
                match_id: matchId
            }
        }).then((result) => {
            return {
                data: result,
                status: httpCodes.ACCEPTED,
                message: "Got the contests."
            }
        }).catch((err) => {
            return {
                data: result,
                status: httpCodes.INTERNAL_SERVER_ERROR,
                error: err
            }            
        });

        if(result.status === httpCodes.INTERNAL_SERVER_ERROR) {
            throw ErrorFactory(result.status, result.message, result.error);
        }

        return result;

    }

}

module.exports = ContestJoinService;