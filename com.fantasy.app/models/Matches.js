// const sequelize = require('sequelize');
const {Sequelize, DataTypes, Model} = require('sequelize');

// sequelize = new Sequelize('sqlite:memory');

const MatchesModel = (sequelize) => {
    const Matches = sequelize.define('n_d11_matches_infos', {
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
        number_of_players : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        venue : { 
            type : DataTypes.STRING(50),
            allowNull : false
        },
        match_country : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        team1 : {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        snameT1: {
            type: DataTypes.STRING(50),
            defaultValue: ""
        },
        api_team1_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        api_team2_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        team2 : {
            type : DataTypes.STRING(50),
            allowNull:false
        },
        snameT2: {
            type: DataTypes.STRING(50),
            defaultValue: ""
        },
        category : {
            type: DataTypes.ENUM('FOOTBALL', 'CRICKET', 'KABADDI'),
            allowNull: false,
        },
        is_roundlocked : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        match_duration_in_hrs : {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        start_date : {
            type : DataTypes.DATE,
            allowNull: false,
        },
        end_date : {
            type:DataTypes.DATE,
            allowNull: false,
        },
        match_format : {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        state : {
            type: DataTypes.ENUM('Upcoming', 'Ongoing', 'Complete', 'Preview'),
            allowNull: false
        },
        league_type: {
            type: DataTypes.ENUM('international', 'leagues', 'women'),
            allowNull: false
        },
        api_match_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: 'column',
        },
        squad_announced: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
)

Matches.associate = (models) => {
    Matches.belongsTo(models.n_d11_leagues_infos, 
        {foreignKey: 'league_id', as: 'n_d11_league_infos'});
}
    return Matches;  
}

module.exports = MatchesModel;