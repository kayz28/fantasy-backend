const ScheduledApiController = require('../controller/ScheduledApi');
const UserController = require('../controller/UserApi');
const app = require('express')();
const validators = require('../joi/request');
// create application/json parser
 
// create application/x-www-form-urlencoded parser

//userservice
app.get('/user/:id', UserController.getUserById);
app.post('/user/create', UserController.createUser);
app.get('/user', UserController.checkUserPassword);

//scheduledapi
app.post('/create/leagues', ScheduledApiController.createLeagues);
app.post('/create/leagues/matches', validators.ValidateCreateMatchRequest, ScheduledApiController.createLeagueMatches);
app.post('/create/leagues/squadrelation', validators.ValidateCreateSquadRelationRequest,ScheduledApiController.createSquadSeriesRelation);

app.get('/leagues/squadId/:seriesId/:teamId', ScheduledApiController.getSquadIdForTeam);
app.get('/leagues/squadlist/:squadId/:seriesId', ScheduledApiController.getSquadListForTeam);
app.post('/create/leagues/players', ScheduledApiController.createPlayersForMatch);
//

module.exports = app;
