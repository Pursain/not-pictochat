const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    color: {
        type: String,
        default: "white"
    },
    people: [{
        type: String,
        default: []
    }]
});

module.exports = Room = mongoose.model("room", RoomSchema);