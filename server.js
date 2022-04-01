const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const {port,database}=require('./config')
dotenv.config()
const app = express()
app.use(cors())

//databasa
mongoose.connect(database,()=>{
    console.log("Connecting to Database")
})
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')


app.use(require('./routes/home'))
app.use(require('./routes/register'))
app.use(require('./routes/login'))
app.use(require('./routes/logout'))
app.use(require('./routes/get-user'))
app.use(require('./routes/job'))
app.use(require('./routes/stats'))
app.use(require('./routes/delete'))



app.listen(port, () => {
    console.log('Server started at port ' + port)
})
