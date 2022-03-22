const router = require("express").Router();
const authorize = require("../middleware/authorization");
const admin = require("../middleware/admin");
const {
    allWords,
    getWordInfoById,
    wordsLimit,
    updateWordInfo,
    deleteWord,
    addWord,
    wordSearch
} = require("../controllers/wordController");

router.route("/")
    .get(allWords)

router.route("/allWords/:_id")
    .get(getWordInfoById)
    .put([authorize, admin], updateWordInfo)
    .delete([authorize, admin], deleteWord)

router.route("/wordsLimit")
    .get(wordsLimit)

router.route("/addWord")
    .post([authorize, admin], addWord)

router.route("/wordSearch")
    .post(wordSearch)


module.exports = router;
