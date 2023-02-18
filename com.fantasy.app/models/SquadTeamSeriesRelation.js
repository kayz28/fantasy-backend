const {Sequelize, DataTypes, Model} = require('sequelize');

const SquadTeamSeriesRelationModel = (sequelize) => {
    const SquadTeamSeriesRelation = sequelize.define('n_d11_squad_team_series_relation', {
        api_squad_id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        api_series_id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        api_team_id : {
            type : DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        }
    }
)
    return SquadTeamSeriesRelation;     
}

module.exports = SquadTeamSeriesRelationModel;