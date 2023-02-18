const {Sequelize, DataTypes, Model} = require('sequelize');

const UserTransactionModel = (sequelize) => {
    
    const UserTransaction = sequelize.define('n_d11_user_transaction_infos', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    fist_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: 'column'
    },
    phone_number: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    is_staff: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    came_from_referral: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    pan_number: {
        type: DataTypes.STRING(20),
    },
    dream11_username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: 'column'
    },
    user_last_active: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    balance: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
    },
    contest_joined: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    contest_won: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    user_points: {
        type: DataTypes.DOUBLE,
        defaultValue: 0 
    },
    universal_identification_id : {
        type: DataTypes.BIGINT,
        defaultValue: 0
    },
    is_signed_in: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        onUpdate: DataTypes.NOW
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'column'
    }
},
    {
        engine:'InnoDB',
        charset: 'utf8mb4',
        comment:  'user registeration information'
    }
)
    return UserTransaction;
}

module.exports = UserTransactionModel;
