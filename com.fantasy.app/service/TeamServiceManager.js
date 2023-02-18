// const cateforyToModelMapping = {
//     "CIRCKET" : model.db_cricket_contest_logs,
//     "BASEBALL" : model.db_baseball_contest_logs,
//     "HOCKEY" : model.db_hocky_contest_logs
// };

const CricketTeamService = require("../service/CricketTeamService");
// const BaseBallTeamService = require("../service/Bas");
// const HockeyTeamSevice = require("../service/CricketTeamService");
// Badminton???? hahahhaa bhogle be like IIM ki maths thodi thodi yaad hai
// For bhogle ===>
// A cistern can be filled by a tap in 12 hours and by the other tap in 9 hours. 
// If both taps are opened together how long will it take to fill the cistern?
// revise karo tooti chala kar karna try ghar pe

class TeamServiceManager {

    constructor() {
    }

    // async _init() {
    //     this.categoryToModelMapping = new Map();
    //     this.categoryToModelMapping.set('CRICKET', await new CricketTeamService().create());
    //     this.categoryToModelMapping.set('BASEBALL', await new BaseBallTeamService());
    //     this.categoryToModelMapping.set('HOCKEY', await new HockeyTeamSevice());
    // }

    // async create() {
    //     const obj = new TeamServiceManager();
    //     await obj._init();
    //     return obj;
    // }

    categoryToModelMapping() {

    }

    initServices() {

    }

    async routeToService(category) {
        try {
        switch(category) {
            case "CRICKET" : return await new CricketTeamService().create();
            case "BASEBALL" : return await new CricketTeamService().create();
            case "HOCKEY" : return await new CricketTeamService().create();
            default : return null;
        }
     } catch(err) {
            throw err;
        }
     }
}


module.exports = TeamServiceManager;