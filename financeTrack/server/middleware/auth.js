const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    else{
        const token = authHeader.split(' ')[1];
        try{
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch(error){
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        
    }
};