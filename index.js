const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()
const connect  = require("./database/db.connect")
const userrouter = require('./route/user.route')
const ejs = require("ejs")

const allowedOrigins = [
  "https://med-track-frontend.vercel.app",
  "http://localhost:5173"
];

currentUser = ""

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS policy violation'), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use(cors({ origin: '*' })); 
app.use(express.json({limit:"50mb"}))
app.use("/", userrouter)
app.set("view engine", "ejs")

const port = 8008

connect();

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})



module.exports = app;