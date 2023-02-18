// const sequelize = require('sequelize');
const {Sequelize, DataTypes, Model} = require('sequelize');
const { sequelize } = require('.');
const Matches = require('./Matches');

// sequelize = new Sequelize('sqlite:memory');

var BallByBallModel = (sequelize) => {
    const BallByBallLogs = sequelize.define('n_d11_ball_by_ball_logs', {
        id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        match_type : {
            type: DataTypes.ENUM('T20', '50-50'),
            allowNull: false
        },
        points_for_ball : {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        run_scored : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        wicket_fell : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
     
    }
);

//catch yeh h ki require karta h par sirf sequalize
// function call kar rha h which returns the model
//and then we are iterating over the object db not 
//the require vala obj

BallByBallLogs.associate = (models) => {
    BallByBallLogs.belongsTo(models.n_d11_matches_infos, 
        {foreignKey: 'match_id', as: 'n_d11_matches_infos'});
}
    return BallByBallLogs;
}

module.exports = BallByBallModel;