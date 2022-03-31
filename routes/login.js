const express = require('express')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jsonwebtoken = require("jsonwebtoken")


router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',async(req,res)=>{
    const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");
    const accessToken=jsonwebtoken.sign({_id:this._id},process.env.TOKEN_SECRET,{expiresIn:3600})
    
    res.cookie('jsonwebtoken', accessToken, {
		maxAge: 86400000,
		httpOnly: true,
	})
	
	res.render('start',{user})
})

module.exports = router