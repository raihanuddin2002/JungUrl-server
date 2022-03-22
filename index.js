const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const env = require('dotenv').config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const wordRouter = require("./routers/wordRouter");
const userRouter = require("./routers/userRouter");
const userWordRouter = require("./routers/userWordRouter");


// port
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/word", wordRouter);
app.use("/user", userRouter);
app.use("/userWords", userWordRouter);

// DATABASE
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.svqjf.mongodb.net/bbq?retryWrites=true&w=majority`)
    .then(() => console.log("Database Connected!"))
    .catch(err => console.error("Database Connection Failed!!"));

// // Database setup
// mongoose.connect('mongodb://localhost:27017/studentList')
//     .then(() => console.log("Database Connected!"))
//     .catch(err => console.error("Database Connection Failed!!"));

// Basic
app.get("/", (req, res) => {
    res.send("JungUrl server Server Running...");
});

app.listen(port, () => {
    console.log("JungUrl server Running on port:", port);
});
