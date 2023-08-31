const express = require("express");
const cors = require("cors");
const routes = require("../routes/");

const app = express();

app.use(express.json());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//mount api routes
app.use("/", routes);

module.exports = app;
