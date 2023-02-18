const app = require('express')();
const TeamController = require('../controller/TeamsApi');
// const teamController = async() => await new TeamController().create();


app.post('/create/team', TeamController.createUserTeam);
app.get('/teams/:category/:matchId', TeamController.getMatchTeams);
app.get('/teams', TeamController.getMatchTeamsByRole);

module.exports = app;
