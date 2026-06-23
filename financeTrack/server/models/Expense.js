const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Expense = sequelize.define('Expense',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
    },
    amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false        
    },
    category: {
        type: DataTypes.ENUM('Rent','Food','Entertainment','Utilities'),
        allowNull: false
    },
    expense_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }    
});

module.exports = Expense;