const express = require('express')
const router = express.Router()
const Job = require("../models/Job")



router.get('/stats', async (req, res) => {
    const stats = await Job.find({}).sort({ updatedAt: -1 })
    res.status(200).json(stats)
})
router.delete('stats/:id', async(req, res)=> {
    const id = req.params.id
    console.log(id)
    try{
    await Job.deleteOne({_id:id})
    res.sendStatus(204)
    }catch (err) {
        res.send(err) 
    }
})

module.exports = router