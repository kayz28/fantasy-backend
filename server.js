const express = require("express");
const app = express();
var http = require('http');

const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()

const db = require("./com.fantasy.app/models/index");
const redisdb = require("./com.fantasy.app/models/redis/index");
const cors = require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

db.sequelize.sync({force: false, alter: true, raw: true}).then(() => {
    console.log("Created tables in mysql");  
}).catch((err) => {
    console.log(err);
    console.log("Error in creating tables in mysql");
});

const userRouter = require("./com.fantasy.app/router/UserRouter");
const teamRouter = require("./com.fantasy.app/router/ContestTeamRouter");
const contestRouter = require("./com.fantasy.app/router/ContestRouter");

app.use(cors(corsOptions));
app.use(jsonParser);
app.use(userRouter);
app.use(teamRouter);
app.use(contestRouter);

var httpServer = http.createServer(app);

httpServer.listen(5000, () => {
    console.log("Happy coding");
});