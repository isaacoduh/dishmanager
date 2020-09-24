const { response } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if(err){
                return res.status(403).json({message: "Authorization Denied"})
            }
            req.user = user;
            next();
        });
    }else{
        res.status(401).json({message: 'Token is invalid'});
    }
}