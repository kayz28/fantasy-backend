// const sequelize = require('sequelize');
const {Sequelize, DataTypes, Model} = require('sequelize');

// sequelize = new Sequelize('sqlite:memory');

const LeaguesModel = (sequelize) => {
    const Leagues = sequelize.define('n_d11_leagues_infos', {
        id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name : {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        start_date : {
            type :  DataTypes.DATE,
            allowNull: false
        },
        end_date : {
            type : DataTypes.DATE,
            allowNull: false,
        },
        duration_in_days : {
            type : DataTypes.INTEGER,
            allowNull : false,
            default : 0
        },
        rating : {
            type : DataTypes.DOUBLE,
            validate : {
                min : 0,
                max : 10
            },
            defaultValue: 0
        },
        category : {
            type : DataTypes.STRING(10),
            allowNull : false
        },
        number_of_teams : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        },
        series_id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: 'column'
        },
        league_type : {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        match_created: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            defaultValue: 0
        }
    }
)

    return Leagues;
}

module.exports = LeaguesModel;