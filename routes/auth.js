const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');
const validInfo = require('../middleware/inputValidator');
const jwtGenerator = require('../utils/jwtUtil');
const authorize = require('../middleware/authorize');

router.post("/register", validInfo, async(req, res) => {
    const {email, name, password} = req.body;
    try {
        const user = await db.User.findOne({where: {email: `${email}`}})
        if(user){
            return res.status(401).json({message: "User already exists!"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = await db.User.create({email, name, hashedPassword});
        const jwtToken = jwtGenerator(newUser.id);
        return res.json({jwtToken});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.post('/login', validInfo, async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await db.User.findOne({where: {email: `${email}`}})
        console.log(user);
        // if(!user){
        //     return res.status(401).json("Invalid Credentials");
        // }
        // const validPassword = await bcrypt.compare(password, user.password);
        // if(!validPassword){
        //     return res.status(401).json("Invalid Credentials");
        // }
        
        // const jwtToken = jwtGenerator(user.id);
        // return res.json({jwtToken});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/verify", authorize, (req, res) => {
    try{
        res.json(true);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;