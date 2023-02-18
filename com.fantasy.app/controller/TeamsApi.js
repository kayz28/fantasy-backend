const TeamServiceManager = require("../service/TeamServiceManager");
const teamServiceManager = new TeamServiceManager();

const TeamController = {

    // constructor() {}

    // async _init() {
    //     this.teamServiceManager = await new TeamServiceManager().create();
    // }

    // async create() {
    //     const obj = new TeamController();
    //     await obj._init();
    //     return obj;
    // }

    createUserTeam : async (req, res) => {
        try {
            const category = req.body.category;
            const body = req.body;
            const service = await teamServiceManager.routeToService(category);
            const data = await service.createTeam(body);
            return res.status(data.status).json(data);
        } catch(error) {
            console.error(error);
            return res.status(error.getStatus).json(error.getMessage);
        }
    },

    getUserTeam : async (req, res) => {
        try {
            const category = req.body.category;
            const user_id = req.body.userId;
            const contest_id = req.body.contest_id;
            const user_team_id = req.body.team_id;
            const service = await teamServiceManager.routeToService(category);
            const data = await service.getUserTeam(user_id, contest_id, user_team_id);
            return res.status(data.status).json(data);
        } catch(error) {
            console.error(error);
            return res.status(error.getStatus).json(error.getMessage);
        } 
    },

    getMatchTeams : async (req, res) => {
        try {
            const match_id = req.params.matchId;
            const player_sub_category = req.params.category;
            const service = await teamServiceManager.routeToService(player_sub_category);
            const data = await service.getMatchTeams(match_id, player_sub_category);
            return res.status(data.status).json(data);
        } catch(error) {
            console.error(error);
            return res.status(error.getStatus).json(error.getMessage);
        }

    },

    getMatchTeamsByRole : async (req, res) => {
        try {
            const category = req.params.category;
            const role = req.query.role;
            const match_id = req.query.matchId;
            const service = await teamServiceManager.routeToService(category);
            const data = await service.getMatchTeamsByRole(match_id, category, role);
            return res.status(data.status).json(data);
        } catch {
            return res.status(error.getStatus).json(error.getMessage);
        }
    }
}

module.exports = TeamController;