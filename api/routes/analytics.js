const express = require("express");
const app = express.Router();

const analyticsController = require("../controllers/analytics");
app.get("/:shortID", analyticsController);

module.exports = app;