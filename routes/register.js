const express = require('express')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')

router.get('/register',(req,res)=>{
    res.render('register')
})
//REGISTER
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            name: req.body.name,
            last: req.body.last,
            city: req.body.city,
            email: req.body.email,
            password: hashedPass,
        })
        const user = await newUser.save()
        res.redirect('/login')
    } catch (err) {
        res.send(err) 
    }
   
})
module.exports = router