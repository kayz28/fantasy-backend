const app = require('express')();
const ContestController = require('../controller/ContestsApi');


app.post('/create/contest', ContestController.createContest);
app.get('/matches/:category', ContestController.getMatchesByCategory);
app.get('/contest/:matchId', ContestController.getContestsByMatchId);

module.exports = app;

