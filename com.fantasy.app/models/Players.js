const {Sequelize, DataTypes, Model} = require('sequelize');

const PlayersModel = (sequelize) => {
    const Players = sequelize.define('n_d11_player_infos', {
        id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        api_squad_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        api_player_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name : {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        role : {
            type: DataTypes.STRING(20),
            defaultValue: 'Allrounder'
        },
        player_rating_in_current_league : {
            type : DataTypes.DOUBLE,
            allowNull : false,
            defaultValue : 0
        },
        in_playing_11 : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_fit : {
            type : DataTypes.INTEGER,
            allowNull: true
        },
        in_dream_team : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        player_sub_category: {
            type : DataTypes.ENUM('FOOTBALL', 'CRICKET', 'KABADDI'),
            allowNull: false,
        },
        previous_player_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: -1
        },
        contest_points: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        api_series_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
   
    }
    );

    Players.associate = (models) => {
        Players.belongsTo(models.n_d11_matches_infos, 
            {foreignKey: 'match_id', as: 'n_d11_matches_infos'});
    };
    return Players;     
}

module.exports = PlayersModel;