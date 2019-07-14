const express = require("express");
const router = express.Router();

const Room = require("../../models/Room");

// @route   GET api/items
// @desc    GET All Items
// @access  Public
router.post("/create", (req, res) => {
    const newRoom = new Room({
        name: req.body.name
    })

    newRoom.save()
        .then(item => res.status(401).send(item));
})

router.post("/join/:id", (req, res) => {
    const roomName = req.params.id;
    const user = req.body.id;

    Room.findOneAndUpdate({name: roomName}, {$push: {people : user}})
        .then(item => {
            res.status(200).send(item);
        })
        .catch(err => {
            res.send(err);
        })
})

router.get("/", async (req, res) => {
    const rooms = await Room.find();

    res.send(rooms);
})

module.exports = router;