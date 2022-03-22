const { UserWord } = require('../models/userWordsModel');

// get words
module.exports.getUserWords = async (req, res) => {
    try {
        const result = await UserWord.find({user: req.user.id}).sort({_id: -1});
        return res.send(result);
    } catch (err) {
        return res.status(400).send(err);
    }
}
// Add users word
module.exports.addUserWord = async (req, res) => {
    const userWord = new UserWord(req.body);

    try {
        const result = await userWord.save();
        return res.send(result);
    } catch (err) {
        return res.status(400).send(err);
    }
}
