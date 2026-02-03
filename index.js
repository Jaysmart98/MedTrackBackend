const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connect = require("./database/db.connect");
const userrouter = require("./route/user.route");

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Express 5 compatible
app.options("/*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use("/", userrouter);

const port = process.env.PORT || 8008;

connect();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
