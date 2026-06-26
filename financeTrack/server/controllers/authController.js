const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    register: async (req, res) => {
        try {
           const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password_hash: hashedPassword,
        })
        res.status(201).json({
            message: "User Registered succesfully"
        }); 
        }
        catch(error){
            res.status(500).json({
                message: "Error registering user",
                error: error.message
            })
        }
        
    },
    login: async (req, res) => {
        //TODO: Finish this endpoint tomorrow
    },
    logout: async (req, res) => {

    },
    password: async (req, res) => {

    }
};