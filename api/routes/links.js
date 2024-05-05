const express = require("express");
const app = express.Router();

const {suffixChecker} = require("../middlewares/links");
const {postUrl} = require("../controllers/links");
app.post("/", suffixChecker, postUrl);

const {getUrl} = require("../controllers/links");
app.get("/:shortID", getUrl);

module.exports = app;