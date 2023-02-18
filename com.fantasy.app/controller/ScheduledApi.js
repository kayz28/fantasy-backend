const ScheduledService = require('../service/ScheduledService');


const ScheduledApiController = {

    createLeagues : async (_req, res) => {
        try {
            const response = await ScheduledService.createLeague();
            return res.status(200).json(response);
        } catch(err) {
            return res.status(err.status).json(err);
        }
    },

    getLeagueSeriesId : async (req, res) => {
        try {
            const response = await ScheduledService.getLeagueSeriesIds();
            return res.status(response.status).json(response);
        } catch(err) {
            return res.status(500).json('Internal Server Error');
        }

    },

    updateLeague : async (req, res) => {

    },

    createLeagueMatches : async (req, res, next) => {
        try {
            const seriesid = req.body.seriesId;
            const category = req.body.category;
            const id = req.body.id;
            const response = await  ScheduledService.createLeagueMatches(id, seriesid, category);
            return res.status(response.status).json(response);
        } catch(err) {
            console.error(err);
            //this is correct , error codes are perfect.
            return res.status(500).json('Internal Server Error');
        }

    },

    createSquadSeriesRelation : async (req, res) => {
        const seriesId = req.body.seriesId;
        try {
            const response = await ScheduledService.createSquadSeriesRelation(seriesId);
            return res.status(response.status).json(response);
        } catch(err) {
            return res.status(500).json('Internal Server Error');
        }
    },

    getSquadIdForTeam : async (req, res) => {
        try{
            const seriesId = req.params.seriesId;
            const teamId = req.params.teamId;
            const response = await ScheduledService.getSquadIdForTeam(seriesId, teamId);
            return res.status(response.status).json(response);
        } catch(err) {
            return res.status(500).json('Internal Server Error');
        }
    },

    getSquadListForTeam : async (req, res) => {
        try {
            const seriesId  = req.params.seriesId;
            const squadId = req.params.squadId;
            const response = await ScheduledService.getSquadList(squadId, seriesId);
            console.log(response);
            return res.status(response.status).json(response);
        } catch (err) {
            return res.status(500).json('Internal Server Error');
        }
    },

    createPlayersForMatch : async (req, res) => {
        try {
            const body = req.body;
            const response = await ScheduledService.createPlayersFromSquad(body.data);
            return res.status(response.status).json(response);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

}

module.exports = ScheduledApiController;