const router = require("express").Router();
const { SignUp, Login, verifyUser } = require("../controllers/userController");
const authorize = require("../middleware/authorization");

router.route("/")
    .post(SignUp)

router.route("/verifyEmail")
    .get(verifyUser)

router.route("/login")
    .post(Login)


router.route("/me")
    .get(authorize, (req, res) => {
        res.send(req.user);
    });

module.exports = router;
