const { Schema, model } = require("mongoose");

const userWordsSchema = Schema({
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
        default: 'jungurl',
    },
    symbol: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 255,
        enum: ["diamond", "bush"],
        default: 'bush'
    },
    username: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 1024
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true
    },
    status: {
        type: String,
        enum: ["pending", "approved"],
        default: 'pending'
    }
})

module.exports.UserWord = model("userWords", userWordsSchema);
