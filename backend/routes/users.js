const express = require('express')
const router = express.Router()
const bcrycpt = require('bcrypt')
const org = process.env.ORG

const { users } = require('../models/models')


// Login api endpoint
router.post('/', async (req, res, next) => {
    const {username, password} = req.body

    if(!(username && password)){
        return res.status(400).json({error: "Username and password are required"});
    }

    try{
        let user = await users.findOne({ username });
        if (!user) {
            return res.status(400).json({error: "Invalid login"});
        }
        if (!await bcrycpt.compare(password, user.password)) {
            return res.status(400).json({error: "Invalid login"});
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        return next(err);
    }
   
})


//Create user API endpoint
router.post('/register', async (req, res) => {
    const userData = {
        username: req.body.username,
        role: req.body.role,
        orgs: org
    }

    if(req.body.password != null || req.body.password != "") {
        userData.password = await bcrycpt.hash(req.body.password, 10)
    }

    const user = users.create(userData);
    res.send('User has been created');
    console.log('Success')
})
module.exports = router