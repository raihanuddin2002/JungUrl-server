const { Word } = require("../models/wordModel");

// Get all words
module.exports.allWords = async (req, res) => {
    try {
        const words = await Word.find().sort({ _id: -1 });
        res.send(words);
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}

// Get Words for home by Limit
module.exports.wordsLimit = async (req, res) => {
    try {
        const wordsLimit = await Word.find({ page: "home" }).limit(60).sort({ _id: -1 });
        res.send(wordsLimit);
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}

// Get word by id
module.exports.getWordInfoById = async (req, res) => {
    try {
        const { _id } = req.params;
        const result = await Word.findOne({ _id });
        res.send(result);
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}

// Save new word
module.exports.addWord = async (req, res) => {
    const word = new Word(req.body);

    try {
        const result = await word.save();
        res.send(result);
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}

// Update word by Id
module.exports.updateWordInfo = async (req, res) => {
    try {
        const result = await Word.findByIdAndUpdate(req.params._id, req.body, { new: true });
        res.send({ upadateId: result._id, message: "Data Updated Succuessful" });
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}

// Delete word by id
module.exports.deleteWord = async (req, res) => {
    try {
        const { _id } = req.params;
        const result = await Word.findByIdAndDelete(_id);
        res.send({ deletedId: result._id, message: "Data Deleted Succuessful" });
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}

// Search Text
module.exports.wordSearch = async (req, res) => {
    const { wordSearchLine1, wordSearchLine2, wordSearchByUsername } = req.body;

    let query;
    if (wordSearchLine1) { query = { wordLine1: { $regex: wordSearchLine1, $options: 'si' } } }
    if (wordSearchLine2) { query = { wordLine2: { $regex: wordSearchLine2, $options: 'si' } } }
    if (wordSearchByUsername) { query = { username: { $regex: wordSearchByUsername, $options: 'si' } } }

    try {
        const result = await Word.find(query).sort({ _id: -1 });
        res.send(result);
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}