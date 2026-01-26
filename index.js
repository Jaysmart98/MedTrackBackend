const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()
const connect  = require("./database/db.connect")
const userrouter = require('./route/user.route')
const ejs = require("ejs")

currentUser = ""

app.use(cors({
    origin: "http://localhost:5173", // Allow your React app
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use(express.json({limit:"50mb"}))
app.use("/", userrouter)
app.set("view engine", "ejs")

const port = 8008

connect();

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})