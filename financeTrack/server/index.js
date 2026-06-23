const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config()
const sequelize = require('./config/database');
const User = require('./models/User');
const Expense = require('./models/Expense');
const Goal = require('./models/Goal');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
    }
};

startServer();