const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    roomID:{
        type: String,
        required: true
    },
    sender:{
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "Text"
    },
    message: {
        type: String,
        required: true
    }
})

MessageSchema.set('timestamps', true);

module.exports = Message = mongoose.model("message", MessageSchema);