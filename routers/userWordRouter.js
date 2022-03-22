const router = require("express").Router();
const { getUserWords,addUserWord } = require("../controllers/userWordController");
const authorize = require("../middleware/authorization");

router.route("/")
    .get(authorize,getUserWords)
    .post(authorize,addUserWord)      

module.exports = router;
