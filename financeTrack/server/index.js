const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config()
const sequelize = require('./config/database');
const User = require('./models/User');
const Expense = require('./models/Expense');
const Goal = require('./models/Goal');
const app = express();
const authRouter = require('./routes/auth')
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter)



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