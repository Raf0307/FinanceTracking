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

    },
    password: async (req, res) => {

    }
};