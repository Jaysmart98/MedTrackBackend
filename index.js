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

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"]
// };

app.use(cors({
  origin:allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// app.options("/*", cors(corsOptions));
app.use(express.json({ limit: "50mb" }));


app.use("/", userrouter);

const port = process.env.PORT || 8008;

connect();

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;



