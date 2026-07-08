const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { where } = require('sequelize');

module.exports = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email,
                password_hash: hashedPassword,
            })
            res.status(201).json({
                message: "User Registered succesfully"
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Error registering user",
                error: error.message
            })
        }

    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (isMatch) {
                //return the JWT token here
                const token = JWT.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                )

                res.status(200).json({
                    token: token
                });
            }
            else {
                res.status(401).json({
                    message: "Invalid Credentials"
                });
            }

        }
        catch (error) {
            res.status(500).json({
                message: "Error Logging in user",
                error: error.message
            })
        }
    },
    logout: async (req, res) => {
        res.status(200).json({
            message: 'Logout succesful'
        })
    },
    password: async (req, res) => {
        try{
            const { currentPassword, newPassword} = req.body;//grab the new and current passwords
        const user = await User.findOne({ where: { id: req.user.id } });//Get the user based on the id 
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);//check to see if the current password matches the stored hashed password
        if(!isMatch){//if not a match then return a 401 error
            res.status(401).json({
                message: 'Incorrect Password'
            })
        }
        else{//if it is a match then change the password_hash into the new password
            const newPasswordHash = await bcrypt.hash(newPassword, 10); 
            user.password_hash = newPasswordHash;
            user.save()
            res.status(200).json({
                message: 'Password changed succesfully'
            })
        }
        }
        catch(error){
            res.status(401).json({
                message: 'An error occured',
                error: error.message
            })
        }
        
    }
};