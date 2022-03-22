const { Schema, model } = require("mongoose");

const wordSchema = Schema({
    wordLine1: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 255
    },
    wordLine2: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 255
    },
    redirectUrl: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 255
    },
    days: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 255,
        default: "1"
    },
    page: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 255,
        enum: ["home", "jungurl"],
    },
    symbol: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 255,
        enum: ["diamond", "bush"],
    },
    username: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 1024
    },
    status: {
        type: String,
        enum: ['approved', 'pending'],
        default: 'approved'
    }
})

module.exports.Word = model("words", wordSchema);