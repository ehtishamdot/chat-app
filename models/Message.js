const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    to: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    from: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date.now,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = {MessageModel};