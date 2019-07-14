const express = require("express");
const router = express.Router();

const Message = require("../../models/Message");

router.get("/:room", (req, res) => {
    const roomName = req.params.room;
    Message
        .find({roomID: roomName})
        .sort({createdAt: -1})
        .limit(10)
        .exec((err, result)=>{
            res.send(result);
        })
});

router.post("/:room", (req, res) => {
    const roomName = req.params.room;
    const sender = req.body.id;
    const message = req.body.message;
    const newMessage = new Message({
        roomID : roomName,
        sender: sender,
        message: message
    });

    newMessage.save()
        .then(item => res.send(item))
        .catch(err => res.send(err));
})

module.exports = router;