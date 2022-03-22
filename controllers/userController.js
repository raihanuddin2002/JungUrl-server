require('dotenv').config();
const { User } = require('../models/userModel');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


// Verify user

let userData;
module.exports.verifyUser = async (req, res) => {
    let { firstName, lastName, country, email, password, isVerified, role } = userData;

    const token = await jwt.verify(req.query.token, process.env.JWT_SECRET_KEY);
    if (isVerified) return res.send("Your Account is already Verified");

    const genSalt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, genSalt);

    const user = new User({ firstName, lastName, country, email, password, isVerified: true, role });

    try {
        const result = await user.save();
        // res.send({
        //     token, data: { name: result.name, email: result.email, isVerified: result.isVerified }
        // });
        res.redirect(`${process.env.CLIENT_API}/verifyEmail`);
    } catch (err) {
        res.status(400).send('Invalid Creintials!!');

    }
}
// Sign up
module.exports.SignUp = async (req, res) => {
    const { firstName, lastName, country, email, password, isVerified, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already Registered!");

    user = new User({ firstName, lastName, country, email, password, isVerified, role });
    const token = await user.generateJwt();

    // Mail send
    const senderInfo = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    // Send Email to user
    const mailOptions = {
        from: `Verify Your Email <jungurl2021@gmail.com>`,
        to: email,
        subject: "Verified Email check",
        //html: `<h2>Thank you for registering our website Jungurl</h2><h4>Hello ${firstName}</h4> <h4>Please Verify Your Email...</h4> <a href="https://bbq-server.herokuapp.com/verifyEmail?token=${token}">Click Here to verify</a>`
        html: `<h2>Thank you for registering our website Jungurl</h2><h4>Hello ${firstName}</h4> <h4>Please Verify Your Email...</h4> <a href="http://localhost:5000/verifyEmail?token=${token}">Click Here to verify</a>`
    }

    // Sending Mail
    const mail = senderInfo.sendMail(mailOptions, function (err, info) {
        if (err) {
            return res.status(400).send('Try Again Something went Wrong!!');
        } else {
            userData = { firstName, lastName, country, email, password, isVerified, role, token };
            res.send({ token, message: `Check your Gmail inbox or spam for varification...` });
        }
    })

}

// login

// Login
module.exports.Login = async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email or Password!!");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid Email or Password!!");

    try {
        const token = user.generateJwt();
        res.send(token);
    } catch (err) {
        res.status(400).send(err)
    }
}
