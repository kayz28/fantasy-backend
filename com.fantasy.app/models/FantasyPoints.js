// const sequelize = require('sequelize');
const {Sequelize, DataTypes, Model} = require('sequelize');

// sequelize = new Sequelize('sqlite:memory');

const FantasyPointsModel = (sequelize) => {
    const FantasyPoints = sequelize.define('n_d11_fantasy_points_rules', {
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
        points_to_be_rewared : {
            type :  DataTypes.INTEGER,
            allowNull: false
        },
        category : {
            type : DataTypes.ENUM('CRICKET', 'FOOTBALL', 'HOCKEY', 'BASEBALL'),
            allowNull: false,
        }
    }
)
    return FantasyPoints;
}

module.exports = FantasyPointsModel;