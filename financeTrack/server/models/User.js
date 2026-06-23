const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = sequelize.define('User',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
});

module.exports = User;