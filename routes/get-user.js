
const express = require('express')
const router = express.Router()
const User = require("../models/User")



router.get('/get-user/:id', async (req, res) => {
    const name = req.params.id
    const note = await User.findOne({
        name: name
    })
    res.status(200).json(note)
})
router.put('/get-user/:id', async (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const last = req.body.last
    const city = req.body.city
    const email = req.body.email
    const data = {
        name: name,
        last: last,
        city: city,
        email: email
    }
    const note = await User.findOneAndUpdate({
        _id: id
    }, data)
    res.status(200).json(note)
})
module.exports = router