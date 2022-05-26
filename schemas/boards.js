const mongoose = require("mongoose");

const boardsSchema = mongoose.Schema({
    boardsId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    title: {
        type: String,
    },
    password: {
        type: Number,
        require: true,
    },
    comment: {
        type: String,
    },
})

module.exports = mongoose.model("Boards", boardsSchema);