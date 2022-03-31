const express = require('express')
const router = express.Router()

router.get('/logout',(req,res)=>{     
	return res
   .cookie('jsonwebtoken','',{maxAge:1})
   .render('login')   
})
module.exports = router