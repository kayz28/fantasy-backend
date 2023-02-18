// const sequelize = require('sequelize');
const {Sequelize, DataTypes, Model} = require('sequelize');

// sequelize = new Sequelize('sqlite:memory');

const ContestsModel = (sequelize) => {
    const Contests = sequelize.define('n_d11_contest_infos', {
        id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        entry_fee : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_mega_contest : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        spots : {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        max_teams_allowed_per_user : {
            type : DataTypes.INTEGER,
            allowNull: false
        },
        contest_total_winnings : {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        is_roundlocked : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        is_filled : {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            defaultValue: 0
        },
        remainging_spots : {
            type: DataTypes.BIGINT,
            allowNull: false
        }

    }
)

Contests.associate = (models) => {
    Contests.belongsTo(models.n_d11_matches_infos, 
        {foreignKey: 'match_id', as: 'n_d11_matches_infos'});
    Contests.belongsTo(models.n_d11_leagues_infos, 
        {foreignKey: 'league_id', as: 'n_d11_leagues_infos'});
}

    return Contests;
}

module.exports = ContestsModel;