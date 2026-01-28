const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const connect = require("./database/db.connect");
const userrouter = require('./route/user.route');
const ejs = require("ejs");

// 1. Configure CORS options
const corsOptions = {
    origin: ["https://med-track-frontend.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// 2. Apply CORS middleware
app.use(cors(corsOptions));

// 3. Explicitly handle Preflight (OPTIONS) requests
app.options('*', cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// View engine setup
app.set("view engine", "ejs");

// Routes
app.use("/", userrouter);

// Connect to Database
connect();

// Only listen if not running as a Vercel serverless function
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8008;
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
}

module.exports = app;