const express = require('express')
const router = express.Router()
const myJob = require("../models/Job")
router.get('/edit-card/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    const note = await myJob.findOne({
        _id: id
    })
    res.status(200).json(note)
})

module.exports = router