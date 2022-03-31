const express = require('express')
const router = express.Router()
const myJob = require("../models/Job")
router.get('/job', async (req, res) => {
    res.send('hello')
})
router.post('/job', async (req, res) => {
   
    try {       
        const newJob = new myJob({
            position: req.body.position,
            company: req.body.company,
            location: req.body.location,
            status: req.body.status,
            type: req.body.type,
        }) 
          
        const job = await newJob.save()
        console.log(job)
       
    } catch (err) {
        res.send(err) 
    }  
})

module.exports = router