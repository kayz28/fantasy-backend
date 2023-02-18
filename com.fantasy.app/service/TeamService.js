const db = require("../models/index");

const TeamService = {

    createUserTeam : async (body) => {
        // Todo : contest joined or not validation 
        // if joined then go ahead.
        const set = new Set(Object.values(teams));
        //validate for 7 + 4 rule
        //validate for 100 points exhaust or not

        var data = {};
        if(category === 'CRICKET' && set.size === 11)
        {
            if(body.vice_captain_id != body.captain_id && body.vice_captain_id in set && body.captain_id in set) {
                data = await db.n_d11_cricket_contest_logs.create(body)
                .then((result) => {
                    return {status: 200, message: "Created the user team", result: result.id};
                }).catch((err) => {
                    return {status: 500, message: "Internal Server Error"};
                });
        } else {
            return {status: 400, message: "Captain id and vice captain id are same.", result: result.id};
        }
    }
        return data;
    },

    getUserTeam : async (user_id, contest_id, user_team_id) => {
        const data = await db.n_d11_cricket_contest_logs.findOne({
            where: {
                user_id: user_id,
                contest_team_id: user_team_id,
                contest_id: contest_id
            }
        }
        ).then((result) => {
        return {status: 200, message: "Found the result", team_data: result};
        }).catch((err) => {
            console.log(err);
            return {status: 500, message: "Internal server error"};
        });

        return data;
    },

    updateUserTeam : async (user_id, contest_id, user_team_id, team, category) => {
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
                console.log("Updated the team with user id " + user_id);
                return {status: 200, message: "Updated the team.", result:result.id};
           }).catch((err) => {
                console.log(err);
                return {status: 500, message: "Internal Server Error"};
           });
           return data;
        } else {
            return {status : 422 , message : "Validation failed for team id's passed. please check and try again"};
        }

    },

    updateUserTeamPoints : async(contest_id, point, player_id) => {

    },

    //rating kaise banani h
    //find the team member with last league rating
    //

}