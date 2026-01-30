const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connect = require("./database/db.connect");
const userrouter = require("./route/user.route");

const app = express();

const allowedOrigins = [
  "https://med-track-frontend.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json({ limit: "50mb" }));

app.use("/", userrouter);

const port = process.env.PORT || 8008;

connect();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;




