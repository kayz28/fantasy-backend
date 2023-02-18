const ContestJoinService = require("../service/ContestJoinService");
const TeamService = require("../service/TeamService");


const ContestController = {

    createContest : async (req, res) => {
        try {
            //check for admin role 
            const entryFee = req.body.entry_fee;
            const expectedSpots = req.body.expected_spots;
            const totalWinnings = req.body.winnings;
            const data = await ContestJoinService.createContest(entryFee, expectedSpots, totalWinnings);
            return res.status(data.status).json(data);
        } catch(error) {
            console.log(error);
            return res.status(error.getStatus).json(error.getMessage);
        }
    },

    getMatchesByCategory : async (req, res) => {
        try {
            const category = req.params.category;
            const data = await ContestJoinService.getMatchByCategory(category);
            return res.status(data.status).json(data);
        } catch(error) {
            console.error(error);
            return res.status(error.getStatus).json(error.getMessage);
        }
    },

    getContestsByMatchId : async (req, res) => {
        try {
            const matchId = req.params.matchId;
            const data = await ContestJoinService.getContests(matchId);
            return res.status(data.status).json(data);
        } catch(error) {
            console.error(error);
            return res.status(error.getStatus).json(error.getMessage);
        }
    }

}

module.exports = ContestController;