const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Goal = sequelize.define('Goal',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target_amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    current_amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    target_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    is_complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
    
});

module.exports = Goal;