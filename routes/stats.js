const express = require('express')
const router = express.Router()
const Job = require("../models/Job")



router.get('/stats', async (req, res) => {
    const stats = await Job.find({})
    res.status(200).json(stats)
})
module.exports = router