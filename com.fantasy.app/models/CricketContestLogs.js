// const sequelize = require('sequelize');
const {Sequelize, DataTypes, Model} = require('sequelize');

// sequelize = new Sequelize('sqlite:memory');

const CricketContestLogsModel = (sequelize) => {
    const CricketContestLogs = sequelize.define('n_d11_cricket_contest_logs', {
        contest_id : {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        p1 : {
            type : DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        p2 : {
            type : DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        p3 : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        p4: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        p5 : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        p6 : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        }, 
        p7 : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        }, 
        p8 : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        p9 : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        p10 : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        p11 : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        match_id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        category : {
            type : DataTypes.ENUM('CRICKET', 'FOOTBALL', 'BASEBALL'),
            allowNull: false,
        },
        user_id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        contest_team_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        points_so_far : {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        credits_used : {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        rank : {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 1
        },
        captain_id : {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        vice_captain_id : {
            type: DataTypes.BIGINT,
            allowNull: false
        }

        }
    )
    return CricketContestLogs;
}

module.exports = CricketContestLogsModel;