const jsonwebtoken = require("jsonwebtoken");

function authenticate(req,res,next){
    
    const token = req.cookies.jsonwebtoken
    if (token === null) return res.sendStatus(401)

    jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
module.exports=authenticate