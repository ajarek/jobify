const express = require('express')
const router = express.Router()
const Job = require("../models/Job")




router.delete('/delete-job/:id', async(req, res)=> {
    const id = req.params.id
    try{
    await Job.deleteOne({_id:id})
    res.sendStatus(204)
    }catch (err) {
        res.send(err) 
    }
})

module.exports = router