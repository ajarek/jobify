const express = require('express')
const router = express.Router()
const myJob = require("../models/Job")

router.put('/edit-job/:id', async (req, res) => {
    const id = req.params.id
    const position = req.body.position
    const company = req.body.company
    const location = req.body.location
    const status = req.body.status
    const type = req.body.type
    const data = {
        position,
        company,
        location,
        status,
        type
    }
    const note = await myJob.findOneAndUpdate({
        _id: id
    }, data)
    res.status(200).json(note)
})
module.exports = router