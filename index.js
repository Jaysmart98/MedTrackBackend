const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connect = require("./database/db.connect");
const userrouter = require("./route/user.route");

const app = express();

const allowedOrigins = [
  "https://med-track-frontend.vercel.app",
  "http://localhost:5173"
];

// CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // handle preflight requests

// JSON parser
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/", userrouter);

// ❌ Remove the custom CORS error handler
// Express + cors will automatically send the correct headers
// If you keep this, it overrides the headers and causes the browser block

const port = process.env.PORT || 8008;

connect();

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;



